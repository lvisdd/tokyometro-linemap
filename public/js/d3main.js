d3.json("/json/tokyo.json", function(json) {
  d3main(json);
});


function d3main(json) {
  var width = 600,
      height = 600,
      centered;
  var scale = 75000;
  var center = [139.7531, 35.6859];
  
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
      var land = topojson.feature(json, json.objects.tokyo).features;
      g.append("g").attr("class", "land")
        .selectAll("path")
        .data(land)
        .enter().append('path')
        .attr("d", path)
        .attr({
          "fill":"#000",
        })
        .on("click", clicked)
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
      var line = topojson.feature(json, json.objects.metro_line).features;
      g.append("g").attr("class", "line")
        .selectAll("path")
        .data(line)
        .enter().append('path')
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
          // console.log(getlinename(d.properties.name));
          return getlinename(d.properties.name);
        })
        // .on("click", clicked)
        .on('mouseover', function() {
        // .on('hover', function() {
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
      var station = topojson.feature(json, json.objects.metro_station).features;
      g.append("g").attr("class", "station")
        .selectAll("path")
        .data(station)
        .enter().append('path')
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
          // console.log(getstationname(d.properties.station_name));
          return getstationname(d.properties.station_name);
        })
        .on('mouseover', function() {
          var self = d3.select(this);
          d3.select('#line_name_header').text('路線名');
          d3.select('#station_name_header').text('駅名');
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
        })
        // .on("click", clicked);
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
}