HTMLWidgets.widget({

  name: 'linkedscatter',

  type: 'output',

  initialize: function(el, width, height) {
    d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height);
  },

  renderValue: function(el, x, data) {
    d3.select(el).select("svg")
      .append("text")
        .attr("x", 15)
        .attr("y", 15)
        .text(x.message);
  },

  resize: function(el, width, height, instance) {

  }

});
