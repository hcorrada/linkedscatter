// compute plot dimensions given margin
function get_plot_dimensions(width, height) {
  var margin = {top: 20, right: 20, bottom: 30, left: 40};
  return {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    margin: margin
  };
}

// make a scaling function for x axis
function make_xScale(width, radius) {
  return d3.scale.linear().range([0, width + radius]);
}

// make a scaling function for y axis
function make_yScale(height, radius) {
  return d3.scale.linear().range([height + radius, 0]);
}

// create the html widget
HTMLWidgets.widget({

  name: 'linkedscatter',

  type: 'output',

  // setup any necessary objects
  initialize: function(el, width, height) {
    var RADIUS = 10;

    // compute plot dimensions and create scaling functions
    var plot_dimensions = get_plot_dimensions(width, height),
        xScale = make_xScale(plot_dimensions.width, RADIUS),
        yScale = make_yScale(plot_dimensions.height, RADIUS);

    // append the svg element and set
    // to completely cover parent DOM element
    var svg = d3.select(el).append("svg")
                  .attr("width", width)
                  .attr("height", height)
                .append("g")
                  .attr("transform",
                        "translate(" +
                        plot_dimensions.margin.left + "," +
                        plot_dimensions.margin.top + ")");

    // create the tooltip div
    // initialize to 0 opacity, so it's hidden
    var tooltip = d3.select(el).append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0);

    return {
      svg: svg,
      tooltip: tooltip,
      xScale: xScale,
      yScale: yScale,
      plot_dimensions: plot_dimensions,
      RADIUS: RADIUS,
    };
  },

  renderValue: function(el, bindings, instance) {
    // convert bound data from data frame to d3 array
    var data = HTMLWidgets.dataframeToD3(bindings.data),
        xvar = bindings.x,
        yvar = bindings.y,
        tooltipVar = bindings.tooltip;

    // get objects from initialized instance
    var svg = instance.svg,
        tooltip = instance.tooltip,
        xScale = instance.xScale,
        yScale = instance.yScale,
        radius = 10;

    var xMap = function(d) {return d[xvar]; },
        yMap = function(d) {return d[yvar]; };

    // set the x scale domain based on bound data
    // with a buffer so circles don't overlap axes
    var xmin = d3.min(data, xMap),
        xmax = d3.max(data, xMap);
    xScale.domain([xmin - 1, xmax + 1]).nice();

    // set the y scale domain based on bound data
    // with a buffer so circles don't overlap axes
    var ymin = d3.min(data, yMap),
        ymax = d3.max(data, yMap);
    yScale.domain([ymin - 1, ymax + 1]).nice();

    // add the x axis
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + instance.plot_dimensions.height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", instance.plot_dimensions.width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text(xvar);

    // add the y axis
    yAxis = d3.svg.axis().scale(yScale).orient("left");
    svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 12)
          .style("text-anchor", "end")
          .text(yvar);

    // make a selection object based on data
    var selection = svg.selectAll(".dot")
                        .data(data);

    // append circles for each data observation
    selection.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) {return xScale(xMap(d)); })
        .attr("cy", function(d) {return yScale(yMap(d)); })
        .attr("r", instance.RADIUS)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    // display observation name as tooltip
    function mouseover(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip.html("<p><strong>" + tooltipVar + "</strong>: " + d[tooltipVar])
        .style("left", (d3.event.pageX + 5) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    }

    // hide tooltip display
    function mouseout(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0);
    }
  },

  resize: function(el, width, height, instance) {

  }

});
