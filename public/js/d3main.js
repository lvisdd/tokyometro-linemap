d3.json("/json/tokyo.json", function(json) {
  d3main(json);
});


function d3main(json) {
  var width = 600,
      height = 600,
      centered;
  var scale = 75000;
  var center = [139.7531, 35.6859];
  
  var colors = d3.scale.category20b();
  var ci=0;

  // var svg = d3.select("body").append("svg")
  var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("overflow", "hidden")
            .attr("position", "relative")
            .attr("vertical-align", "middle")
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
        .on('mouseover', function() {
          var self = d3.select(this);
          d3.select('#line_name')
            .text('')
            .append('a')
            .attr('href', getlineurl(self.attr('line_name')))
            .text(self.attr('line_name'));
          d3.select('#station_name').text(' ');
          d3.select('#mark')
            .attr({
              'src': getlineicon(self.attr('line_name')),
              'alt': self.attr('line_name'),
            })
        })
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
          "pointer-events":"all",
        })
        .attr('line_name', function(d) {
          return getlinename(d.properties.name);
        })
        .attr('station_name', function(d) {
          return getstationname(d.properties.station_name);
        })
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
          particle(d);
        })
        .on("click", clicked);
    });
  }
  
  function zoomed() {
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    g.attr('d', path);
  }
  
  function clicked(d) {
    var x, y, k;
    if (d && centered !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      centered = d;
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
    }
  
    // g.selectAll("path")
    //   .classed("active", centered && function(d) { return d === centered; });
  
    g.transition()
      .duration(750)
    //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
    //   .style("stroke-width", 1.5 / k + "px");
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
  }

  function particle(d) {
    i = 0;
    var m = path.centroid(d);
    g.append("circle", "rect")
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
