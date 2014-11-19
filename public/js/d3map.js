var width = 320,
    height = 480,
    centered;
var scale = 75000;
var center = [139.7531, 35.6859];

var svg = d3.select("body").append("svg")
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

function createMapBase(){
  d3.json("/json/tokyo.json", function(json) {
    d3land(json);
    d3line();
    d3station();
  });
}

function d3land(json){
  // d3.json("/json/tokyo.json", function(json) {
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

function getlinecolor(name){
  if(line_colors.hasOwnProperty(name)){
    return line_colors[name];
  } else{
    return "#000";
  }
}

function getlinename(name){
  if(line_milt2odpt.hasOwnProperty(name)){
    return line_milt2odpt[name];
  } else{
    return name;
  }
}

function getstationname(name){
  if(station_milt2odpt.hasOwnProperty(name)){
    return station_milt2odpt[name];
  } else{
    return name;
  }
}

function getlineicon(name){
  if(line_icons.hasOwnProperty(name)){
    return line_icons[name];
  } else{
    return "";
  }
}

function getstationicon(line_name,station_name){
  var name = line_name + "-" + station_name;
  if(station_icons.hasOwnProperty(name)){
    return station_icons[name];
  } else{
    return "";
  }
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
        // "fill-opacity":"0",
        "opacity":"0.5",
        // "opacity":"0.5",
        // "stroke-opacity":"1",
        "stroke-linejoin":"round",
        // "stroke-linejoin":"bevel",
        // "stroke-linejoin":"round",
        // "stroke-linecap":"round"
        // "stroke-linecap":"square"
        // "stroke-width":"2.5px",
        // "vector-effect":"non-scaling-stroke",
      })
      .attr('line_name', function(d) {
        return getlinename(d.properties.name);
      })
      .on('mouseover', function() {
      // .on('hover', function() {
        var self = d3.select(this);
        d3.select('#line_name_header').text('路線名');
        d3.select('#station_name_header').text('');
        d3.select('#line_name').text(self.attr('line_name'));
        d3.select('#station_name').text('');
        d3.select('#line_mark')
          .attr({
            'src': getlineicon(self.attr('line_name')),
            'alt': self.attr('line_name'),
          });
        d3.select('#station_mark')
          .attr({
            'src':'',
            'alt':'',
          });
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
        // "stroke-linejoin":"round",
        // "stroke-linecap":"round"
        // "stroke-linecap":"square"
        "stroke-width":"1.5px",
        // "vector-effect":"non-scaling-stroke",
        "pointer-events":"all",
      })
      .attr('line_name', function(d) {
        return getlinename(d.properties.name);
      })
      .attr('station_name', function(d) {
        return getstationname(d.properties.station_name);
      })
      .on('mouseover', function() {
        var self = d3.select(this);
        d3.select('#line_name_header').text('路線名');
        d3.select('#station_name_header').text('駅名');
        d3.select('#line_name').text(self.attr('line_name'));
        d3.select('#station_name').text(self.attr('station_name'));
        d3.select('#line_mark')
          .attr({
            'src': getlineicon(self.attr('line_name')),
            'alt': self.attr('line_name'),
          });
        d3.select('#station_mark')
          .attr({
            'src': getstationicon(self.attr('line_name'),self.attr('station_name')),
            'alt': self.attr('station_name'),
          });
      })
      .on("click", clicked);
  });
}
