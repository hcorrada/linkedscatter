HTMLWidgets.widget({

  name: 'linkedscatter',

  type: 'output',

  initialize: function(el, width, height) {
    var svg = d3.select(el)
                  .append("svg")
                    .attr("width", width)
                    .attr("height", height);
    var data = [
      {x: 10, y: 20, name: 'alpha'},
      {x: 50, y: 70, name: 'beta'},
      {x: 60, y: 90, name: 'gamma'},
    ];

    return {
      svg: svg,
      data: data,
    };
  },

  renderValue: function(el, x, instance) {

    el.innerText = x.message;

  },

  resize: function(el, width, height, instance) {

  }

});
