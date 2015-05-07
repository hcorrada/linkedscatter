scatterplot = function() {
  var _g,
      _width,
      _height,
      _xScale,
      _yScale,
      _data,
      _xvar,
      _yvar,
      _keyvar,
      _radius,
      _dispatch = d3.dispatch("hover");

  var _margin = {top: 20, right: 20, bottom: 30, left: 40};

  function chart(container) {
    _g = container;
    _update();
  }
  chart.update = _update;
  chart.set_dimensions = _set_dimensions;

  function _set_dimensions(container_width, container_height) {
    _width = container_width - _margin.left - _margin.right;
    _height = container_height - _margin.top - _margin.bottom;
    _xScale = d3.scale.linear().range([0, _width + _radius]);
    _yScale = d3.scale.linear().range([_height + _radius, 0]);
  }

  function _update() {
    var xMap = function(d) {return d[_xvar]; },
        yMap = function(d) {return d[_yvar]; };

    // set the x scale domain based on bound data
    // with a buffer so circles don't overlap axes
    var xmin = d3.min(_data, xMap),
        xmax = d3.max(_data, xMap);
    _xScale.domain([xmin - 1, xmax + 1]).nice();

    // set the y scale domain based on bound data
    // with a buffer so circles don't overlap axes
    var ymin = d3.min(_data, yMap),
        ymax = d3.max(_data, yMap);
    _yScale.domain([ymin - 1, ymax + 1]).nice();

    // add the x axis
    xAxis = d3.svg.axis().scale(_xScale).orient("bottom");
    _g.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + _height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", _width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text(_xvar);

    // add the y axis
    yAxis = d3.svg.axis().scale(_yScale).orient("left");
    _g.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 12)
          .style("text-anchor", "end")
          .text(_yvar);

    // make a selection object based on data
    var selection = _g.selectAll(".dot")
                        .data(_data);


    // append circles for each data observation
    selection.enter().append("circle")
        .attr("class", "dot")
        .attr("class", "unhovered")
        .attr("cx", function(d) {return _xScale(xMap(d)); })
        .attr("cy", function(d) {return _yScale(yMap(d)); })
        .attr("r", _radius)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    function mouseover(d, i) {
      var circle = d3.select(selection[0][i]);
      circle.attr("class", "hovered");
      _dispatch.hover([d]);
    }

    function mouseout(d, i) {
      var circle = d3.select(selection[0][i]);
      circle.attr("class", "unhovered");
      _dispatch.hover([]);
    }

  }

  // highlights element hovered elsewhere
  chart.highlight = function(data) {
    var circles = _g.selectAll("circle")
                      .attr("class", "unhovered");
    circles.data(data, function(d) { return d[_keyvar]; })
      .attr("class", "hovered");
  };

  chart.set_dimensions = _set_dimensions;
  chart.update = _update;

  chart.width = function(value) {
    if (!arguments.length) return _width;
    _width = value;
    return chart;
  };

  chart.height = function(value) {
    if (!arguments.length) return _height;
    _height = value;
    return chart;
  };

  chart.data = function(value) {
    if (!arguments.length) return _data;
    _data = value;
    return chart;
  };

  chart.xvar = function(value) {
    if (!arguments.length) return _xvar;
    _xvar = value;
    return chart;
  };

  chart.yvar = function(value) {
    if (!arguments.length) return _yvar;
    _yvar = value;
    return chart;
  };

  chart.keyvar = function(value) {
    if (!arguments.length) return _keyvar;
    _keyvar = value;
    return chart;
  };

  chart.radius = function(value) {
    if (!arguments.length) return _radius;
    _radius = value;
    return chart;
  };

  return d3.rebind(chart, _dispatch, "on");
};

    // display observation name as tooltip
/*    function mouseover(d, i) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip.html("<p><strong>" + tooltipVar + "</strong>: " + d[tooltipVar])
        .style("left", (d3.event.pageX + 5) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    }

    // hide tooltip display
    function mouseout(d, i) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0);
    }
*/

