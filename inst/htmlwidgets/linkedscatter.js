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
function make_xScale(width) {
  return d3.scale.linear().range([0, width]);
}

// make a scaling function for y axis
function make_yScale(height) {
  return d3.scale.linear().range([height, 0]);
}

// create the html widget
HTMLWidgets.widget({

  name: 'linkedscatter',

  type: 'output',

  // setup any necessary objects
  initialize: function(el, width, height) {
    // compute plot dimensions and create scaling functions
    var plot_dimensions = get_plot_dimensions(width, height),
        xScale = make_xScale(plot_dimensions.width),
        yScale = make_yScale(plot_dimensions.height);

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
      yScale: yScale
    };
  },

  renderValue: function(el, bindings, instance) {
    // convert bound data from data frame to d3 array
    var data = HTMLWidgets.dataframeToD3(bindings.data);

    // get objects from initialized instance
    var svg = instance.svg,
        tooltip = instance.tooltip,
        xScale = instance.xScale,
        yScale = instance.yScale,
        radius = 10;

    // set the x scale domain based on bound data
    // with a buffer so circles don't overlap axes
    xScale.domain([d3.min(data, function(d) {return d.x; }) - (radius/2) - 1,
                   d3.max(data, function(d) {return d.x; }) + (radius/2) + 1])
            .nice();

    // set the y scale domain based on bound data
    // with a buffer so circles don't overlap axes
    yScale.domain([d3.min(data, function(d) {return d.y; }) - (radius/2) - 1,
                   d3.max(data, function(d) {return d.y; }) + (radius/2) + 1])
            .nice();

    // make a selection object based on data
    var selection = svg.selectAll(".dot")
                        .data(data);

    // append circles for each data observation
    selection.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) {return xScale(d.x); })
        .attr("cy", function(d) {return yScale(d.y); })
        .attr("r", radius)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    // display observation name as tooltip
    function mouseover(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip.html(d.name)
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
