tooltip = function() {
  var div,
      data,
      tooltipVar;

  function chart(el) {
    _div = d3.select(el).append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0);
    //update();
  }
  chart.update = _update;

  _update = function() {

  };

  // getter setter for data
  chart.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return chart;
  };

  // getter setter for tooltipVar
  chart.tooltipVar = function(value) {
    if (!arguments.length) return tooltipVar;
    tooltipVar = value;
    return chart;
  };

  return chart;
};
