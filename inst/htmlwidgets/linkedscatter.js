function svg_size(width, height) {
  var margin = {top: 20, right: 20, bottom: 30, left: 40};
  return {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
  };
}

function make_xScale(width) {
  return d3.scale.linear().range([0, width]);
}

function make_yScale(height) {
  return d3.scale.linear().range([height, 0]);
}

HTMLWidgets.widget({

  name: 'linkedscatter',

  type: 'output',

  initialize: function(el, width, height) {
    var svg_dimensions = svg_size(width, height),
        xScale = make_xScale(svg_dimensions.width),
        yScale = make_yScale(svg_dimensions.height);

    d3.select(el).append("svg")
        .attr("width", svg_dimensions.width)
        .attr("height", svg_dimensions.height);

    var tooltip = d3.select(el).append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0);

    return {
      tooltip: tooltip,
      xScale: xScale,
      yScale: yScale
    };
  },

  renderValue: function(el, bindings, instance) {
    var data = HTMLWidgets.dataframeToD3(bindings.data),
        tooltip = instance.tooltip,
        xScale = instance.xScale,
        yScale = instance.yScale,
        radius = 10;

    xScale.domain([d3.min(data, function(d) {return d.x; }) - (radius/2),
                   d3.max(data, function(d) {return d.x; }) + (radius/2)])
            .nice();
    yScale.domain([d3.min(data, function(d) {return d.y; }) - (radius/2),
                   d3.max(data, function(d) {return d.y; }) + (radius/2)])
            .nice();

    var selection = d3.select(el).select("svg")
          .selectAll(".dot")
          .data(data);

    selection.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) {return xScale(d.x); })
        .attr("cy", function(d) {return yScale(d.y); })
        .attr("r", radius)
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
