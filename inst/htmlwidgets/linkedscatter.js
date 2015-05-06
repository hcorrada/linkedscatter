HTMLWidgets.widget({

  name: 'linkedscatter',

  type: 'output',

  initialize: function(el, width, height) {
    d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height);
  },

  renderValue: function(el, x, instance) {
    var data = HTMLWidgets.dataframeToD3(x.data);
    console.log(data);

    var selection = d3.select(el).select("svg")
          .selectAll(".dot")
          .data(data);

    selection.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", 15);
  },

  resize: function(el, width, height, instance) {

  }

});
