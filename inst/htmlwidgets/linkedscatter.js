HTMLWidgets.widget({

  name: 'linkedscatter',

  type: 'output',

  initialize: function(el, width, height) {
    d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height);

    var tooltip = d3.select(el).append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0);

    return {
      tooltip: tooltip,
    };
  },

  renderValue: function(el, x, instance) {
    var data = HTMLWidgets.dataframeToD3(x.data);
    var tooltip = instance.tooltip;

    var selection = d3.select(el).select("svg")
          .selectAll(".dot")
          .data(data);

    selection.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", 15)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    function mouseover(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip.html(d.name)
        .style("left", (d3.event.pageX + 5) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    }

    function mouseout(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0);
    }
  },

  resize: function(el, width, height, instance) {

  }

});
