tooltip = function() {
  var _div,
      _data,
      _tooltipVar,
      _keyvar,
      _dispatch = d3.dispatch("hover");

  function chart(el) {
    _div = d3.select(el).append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0);
    _dispatch = d3.dispatch("hover");
    //update();
  }
  chart.update = _update;

  function _update() {

  }

  chart.highlight = function(d) {
    if (!d.length) {
      _div.transition()
        .duration(200)
        .style("opacity", 0);
    } else {
      _div.html("<p><strong>" + _tooltipVar + "</strong>: " + d[0][_tooltipVar])
        .style("left", (d3.event.pageX + 5) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      _div.transition()
        .duration(200)
        .style("opacity", 0.9);
    }
  };

  // getter setter for data
  chart.data = function(value) {
    if (!arguments.length) return _data;
    _data = value;
    return chart;
  };

  chart.keyvar = function(value) {
    if (!arguments.length) return _keyvar;
    _keyvar = value;
    return chart;
  }
  // getter setter for tooltipVar
  chart.tooltipVar = function(value) {
    if (!arguments.length) return _tooltipVar;
    _tooltipVar = value;
    return chart;
  };

  return d3.rebind(chart, _dispatch, "on");
};
