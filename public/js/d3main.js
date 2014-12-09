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

  var rect = svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr({
              "fill":"#1B2C73",
              "fill-opacity":"1",
            })

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
      sidebar();
  }
  
  function d3land(){
      // 東京都（23区）
      var data = topojson.feature(json, json.objects.tokyo).features;
      var land = g.append("g").attr("class", "land")
        .selectAll("path")
        .data(data)
        .enter().append('path')
        .attr("land_idx", function(d, i) {
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
          })
          .text(function(d) {
            return d.properties.name;
          })
          ;
      
      // ラベル重複排除
      for (var i in city_labels) {
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
        // .attr("id", function(d) {
        //   return getlinedict(getlinename(d.properties.name));
        // })
        .attr("line_idx", function(d, i) {
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
        .attr("id", function(d) {
          return getlinedict(getlinename(d.properties.name)) + "-" + getstationdict(getstationname(d.properties.station_name));
        })
        .attr("station_idx", function(d, i) {
          return i + 1;
        })
        .attr("class", function(d) {
          return getlinename(d.properties.name) + "-" + getstationname(d.properties.station_name);
        })
        .attr('d', path)
        .attr('centroid', function(d) {return path.centroid(d);})
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
        .on("click", function(station) {
          if (station != null) {
            target_clicked(station);
            target_linked(station);
            target_focused(station);
          }
        })
        .on('mouseover', function(d) {
          clicked(d);
          linked(this);
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

  function linked(station) {
    var self = d3.select(station);
    d3.select('#tokyometro_name')
      .select('a')
      .style("color", getlinecolor(self.attr('line_name')))
      .style("text-decoration", "underline")
    d3.select('#line_name')
      .text('')
      .append('a')
      .attr('href', getlineurl(self.attr('line_name')))
      .style("color", getlinecolor(self.attr('line_name')))
      .style("text-decoration", "underline")
      .text(self.attr('line_name'));
    d3.select('#station_name')
      .text('')
      .append('a')
      .attr('href', getstationurl(self.attr('station_name')))
      .style("color", getlinecolor(self.attr('line_name')))
      .style("text-decoration", "underline")
      .text(self.attr('station_name')　+ "駅");
    d3.select('#mark')
      .attr({
         'src': getstationicon(self.attr('line_name'),self.attr('station_name')),
         'alt': self.attr('station_name'),
      });
  }

  function focused(d) {
    // i = 0;
    var centroid = path.centroid(d);
    g.append("circle")
      .attr("cx", centroid[0])
      .attr("cy", centroid[1])
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
        .attr("stroke-width", "2")
        .style("stroke-opacity", 1e-6)
        .remove();
  
    // d3.event.preventDefault();
  }

  function target_clicked(station) {
    var x, y, k;
    var line_name = station.attr("line_name");
    var centroid = station.attr("centroid").split(',');
    x = centroid[0];
    y = centroid[1];
    k = zoom.scale();
  
    g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
  }

  function target_linked(station) {
    var self = station;
    d3.select('#tokyometro_name')
      .select('a')
      .style("color", getlinecolor(self.attr('line_name')))
      .style("text-decoration", "underline")
    d3.select('#line_name')
      .text('')
      .append('a')
      .attr('href', getlineurl(self.attr('line_name')))
      .style("color", getlinecolor(self.attr('line_name')))
      .style("text-decoration", "underline")
      .text(self.attr('line_name'));
    d3.select('#station_name')
      .text('')
      .append('a')
      .attr('href', getstationurl(self.attr('station_name')))
      .style("color", getlinecolor(self.attr('line_name')))
      .style("text-decoration", "underline")
      .text(self.attr('station_name')　+ "駅");
    d3.select('#mark')
      .attr({
         'src': getstationicon(self.attr('line_name'),self.attr('station_name')),
         'alt': self.attr('station_name'),
      });
  }

  function target_focused(station) {
    var line_name = station.attr("line_name");
    var centroid = station.attr("centroid").split(',');
    g.append("circle")
      .attr("cx", centroid[0])
      .attr("cy", centroid[1])
      .attr("r", 1e-6)
      .attr({
        "fill":"none",
        "stroke":getlinecolor(getlinename(line_name)),
        "stroke-opacity":"1",
      })
      .transition()
        .duration(1000)
        .delay(100)
        .ease(Math.sqrt)
        .attr("r", 15)
        .attr("stroke-width", "2")
        .style("stroke-opacity", 1e-6)
        .remove();
  
    // d3.event.preventDefault();
  }

  function sidebar() {
    // sidebar
    for (var key in line_icons) {
      d3.select("#sidebar")
        .append("li")
          .attr("id", "sidebar" + getlinedict(getlinename(key)))
        .append("label")
          .attr("class", "tree-toggler nav-header")
        // .append("a")
        //   .attr("href", "#")
          .style("color", getlinecolor(key))
          .style("text-decoration", "underline")
          .text(key)
        .append("img")
          .attr({
            'src': getlineicon(key),
            'alt': key,
            'align':"left",
            'class':"img-responsive",
            'width':"25",
            'height':"25",
          })
        ;

      d3.select("#" + "sidebar" + getlinedict(getlinename(key)))
        .append("ul")
        .attr("class", "nav nav-list tree")
        ;
    }

    for (var key in station_icons) {
      var station_label = key.split("-");
      d3.select("#" + "sidebar" + getlinedict(getlinename(station_label[0])))
        .select("ul")
        .append("li")
        .append("label")
          .style("padding-left", "15px")
        .append("a")
        .attr("href", "#")
        .attr("onClick", function() {
          var replaced_station_label = getstationsharename(key).split("-");
          return 'selected("' + getlinedict(getlinename(replaced_station_label[0])) + '","' + getstationdict(getstationname(replaced_station_label[1])) + '"); return false;';
        })
        .attr("onMouseover", function() {
          var replaced_station_label = getstationsharename(key).split("-");
          return 'selected("' + getlinedict(getlinename(replaced_station_label[0])) + '","' + getstationdict(getstationname(replaced_station_label[1])) + '"); return false;';
        })
        .style("color", getlinecolor(station_label[0]))
        .style("text-decoration", "underline")
        .text(station_label[1])
        .append("img")
          .attr({
            'src': getstationicon(station_label[0], station_label[1]),
            'alt': station_label[1],
            'align':"left",
            'class':"img-responsive",
            'width':"21",
            'height':"21",
          })
        ;
    }

    $(document).ready(function() {
      $('ul.tree').hide();
      $('label.tree-toggler').click(function() {
        $(this).parent().children('ul.tree').toggle(750);
      });
      $('label.tree-toggler').mouseover(function() {
        $(this).parent().children('ul.tree').toggle(750);
      });
    });
  }
}

function selected(line_id, station_id) {
  var station = d3.select('#' + line_id + "-" + station_id);
  station.on("click")(station);
}
