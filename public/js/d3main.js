d3.json("/json/tokyo.json", function(json) {
  d3main(json);
});

function d3main(json) {
  var width = 600,
      height = 600,
      centered;
  var scale = 75000;
  var scaleextent = 1;
  var center = [139.7531, 35.6859];
  
  var svg = d3.select("#map").append("svg")
            .attr({
              "width":width,
              "height":height,
              "overflow":"hidden",
              "position":"relative",
              "vertical-align":"middle",
              "pointer-events":"all",
            })
            ;

  var g = svg.append("g");
  
  var projection = d3.geo.mercator()
                     .center(center)
                     .scale(scale)
                     .translate([width / 2, height / 2]);
  
  var path = d3.geo.path().projection(projection);
  
  var zoom = d3.behavior.zoom()
               .scaleExtent([1, 8])
               .on("zoom", zoomed);
 
  createMapBase();
  
  svg
    .call(zoom)
    .call(zoom.event);
  
  function createMapBase(){
      d3land();
      d3line();
      d3station();
  }
  
  function d3land(){
      // 東京都（23区）
      var data = topojson.feature(json, json.objects.tokyo).features;
      var land = g.append("g").attr("class", "land")
        .selectAll("path")
        .data(data)
        .enter().append('path')
        .attr("land_id", function(d, i) {
          return i + 1;
        })
        .attr("d", path)
        .attr('land_name', function(d) {
          return d.properties.name;
        })
        .attr({
          "fill":"#000",
          "opacity":"1",
        })
        ;

      // 境界線
      g.append("g").attr("class", "boundary")
        .append("path")
        .datum(topojson.mesh(json, json.objects.tokyo, function(a, b) { return a !== b; }))
        .attr("d", path)
        .attr({
          "fill":"none",
          "stroke":"#fff",
          "stroke-dasharray":"2,2",
          "stroke-linejoin":"round",
          "stroke-linecap":"round",
          "vector-effect":"non-scaling-stroke"
        })
        ;

      // 区名
      var city_labels = new Array();
      g.append("g").attr("class", "city-label")
        .selectAll("text")
        .data(data)
        .enter().append("text")
          // .attr("class", function(d) {
          .attr("id", function(d) {
            if(!(city_labels.indexOf(d.properties.name) > -1)) {
              city_labels.push(d.properties.name);
            }
            return d.properties.name;
          })
          .attr("transform", function(d) {
            return "translate(" + path.centroid(d) + ")";
          })
          .attr({
            "dy":".35em",
            "fill":"#fff",
            "fill-opacity":"0.25",
            "font-size":"8px",
            "font-weight":"500",     
            "text-anchor":"middle",
            "display": "none",
            // "display": "block",
          })
          .text(function(d) {
            return d.properties.name;
        });
      
      // ラベル重複排除
      for (var i in city_labels) {
        // console.log(g.select("city-label."+city_labels[i]));
        d3.select("#"+city_labels[i]).style("display", "block");
      }
  }
  
  function d3line(){
    d3.json("/json/metro_line.json", function(json) {
      // 路線図
      var data = topojson.feature(json, json.objects.metro_line).features;
      var line = g.append("g").attr("class", "line")
        .selectAll("path")
        .data(data)
        .enter().append('path')
        .attr("line_id", function(d, i) {
          return i + 1;
        })
        .attr('d', path)
        .style("stroke", function(d) {
           return getlinecolor(getlinename(d.properties.name));
        })
        .attr({
          "fill":"none",
          "opacity":"0.5",
          "stroke-linejoin":"round",
        })
        .attr('line_name', function(d) {
          return getlinename(d.properties.name);
        })
        // .on('mouseover', function() {
        //   var self = d3.select(this);
        //   d3.select('#line_name')
        //     .text('')
        //     .append('a')
        //     .attr('href', getlineurl(self.attr('line_name')))
        //     .text(self.attr('line_name'));
        //   d3.select('#station_name').text(' ');
        //   d3.select('#mark')
        //     .attr({
        //       'src': getlineicon(self.attr('line_name')),
        //       'alt': self.attr('line_name'),
        //     })
        // })
        ;
    });
  }
  
  function d3station(){
    d3.json("/json/metro_station.json", function(json) {
      // 駅
      var data = topojson.feature(json, json.objects.metro_station).features;
      var station = g.append("g").attr("class", "station")
        .selectAll("path")
        .data(data)
        .enter().append('path')
        .attr("station_id", function(d, i) {
          return i + 1;
        })
        .attr('d', path)
        .style("stroke", function(d) {
          return getlinecolor(getlinename(d.properties.name));
        })
        .attr({
          "fill":"none",
          "fill-opacity":"1",
          "opacity":"1",
          "stroke-width":"1.5px",
        })
        .attr('line_name', function(d) {
          return getlinename(d.properties.name);
        })
        .attr('station_name', function(d) {
          return getstationname(d.properties.station_name);
        })
        .on("click", clicked)
        .on('mouseover', function(d) {
          var self = d3.select(this);
          d3.select('#line_name')
            .text('')
            .append('a')
            .attr('href', getlineurl(self.attr('line_name')))
            .text(self.attr('line_name'));
          d3.select('#station_name')
            .text('')
            .append('a')
            .attr('href', getstationurl(self.attr('station_name')))
            .text(self.attr('station_name')　+ "駅");
          d3.select('#mark')
            .attr({
               'src': getstationicon(self.attr('line_name'),self.attr('station_name')),
               'alt': self.attr('station_name'),
            });
          focused(d);
        })
        .append('circle')
          .attr('class', 'click-capture')
          .style('visibility', 'hidden')
          .attr({
            "cx":"0",
            "cy":"0",
            "r":"5",
          })
        ;
    });
  }
  
  function zoomed() {
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    g.attr('d', path);
  }
  
  function clicked(d) {
    var x, y, k;
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = zoom.scale();

    g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
  }

  function focused(d) {
    i = 0;
    var m = path.centroid(d);
    g.append("circle")
      .attr("cx", m[0])
      .attr("cy", m[1])
      .attr("r", 1e-6)
      .attr({
        "fill":"none",
        "stroke":getlinecolor(getlinename(d.properties.name)),
        "stroke-opacity":"1",
      })
      .transition()
        .duration(1000)
        .delay(100)
        .ease(Math.sqrt)
        .attr("r", 15)
        .style("stroke-opacity", 1e-6)
        .remove();
  
    // d3.event.preventDefault();
  }
}
