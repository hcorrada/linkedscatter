HTMLWidgets.widget({

  name: 'linkedscatter',

  type: 'output',

  initialize: function(el, width, height) {
    d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height);

    var data = [
      {x: 100, y: 25, name: 'alpha'},
      {x: 25, y: 28, name: 'beta'},
      {x: 200, y: 125, name: 'gamma'}
    ];

    return data;
  },

  renderValue: function(el, x, data) {
    var selection = d3.select(el).select("svg")
          .selectAll("circle")
          .data(data);

    selection.enter().append("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", 15)
        .style("fill", "steelblue");
  },

  resize: function(el, width, height, instance) {

  }

});
