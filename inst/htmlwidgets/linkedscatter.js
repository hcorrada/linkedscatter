// create the html widget
HTMLWidgets.widget({

  name: 'linkedscatter',

  type: 'output',

  // setup any necessary objects
  initialize: function(el, width, height) {
    var RADIUS = 10;

    // append the svg element and set
    // to completely cover parent DOM element
    var svg = d3.select(el).append("svg")
                  .attr("width", width)
                  .attr("height", height);
    svg.append("g")
          .attr("id", "leftscatter"),
    svg.append("g")
          .attr("id", "rightscatter")
          .attr("transform", "translate(" + width / 2 + ",0)");

    var left_scatter = scatterplot()
                        .radius(RADIUS);
        right_scatter = scatterplot()
                        .radius(RADIUS);
    left_scatter.set_dimensions(width / 2, height);
    right_scatter.set_dimensions(width / 2, height);

    return {
      left_scatter: left_scatter,
      right_scatter: right_scatter,
    };

  },

  renderValue: function(el, bindings, instance) {
    // convert bound data from data frame to d3 array
    var data = HTMLWidgets.dataframeToD3(bindings.data),
        x1var = bindings.x1,
        x2var = bindings.x2,
        yvar = bindings.y,
        tooltipVar = bindings.tooltip;

    // make the left scatter plot
    instance.left_scatter
      .data(data)
      .xvar(x1var)
      .yvar(yvar);
    instance.left_scatter(d3.select("#leftscatter"));

    // make the right scatter plot
    instance.right_scatter
      .data(data)
      .xvar(x2var)
      .yvar(yvar);
    instance.right_scatter(d3.select("#rightscatter"));

    // make the tooltip div
    var ttip_object = tooltip();
    ttip_object
      .data(data)
      .tooltipVar(tooltipVar);
    ttip_object(el);
  },

  resize: function(el, width, height, instance) {

  }

});
