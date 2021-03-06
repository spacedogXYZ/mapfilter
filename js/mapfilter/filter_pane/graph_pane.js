'use strict'

var d3 = window.d3
var BarChart = require('./bar_chart.js')
module.exports = require('backbone').View.extend({
  id: 'graph-pane',

  events: {
    'click .close': 'close',
    'click': 'noop'
  },

  initialize: function (options) {
    var self = this
    this.$el.append('<button type="button" class="close" aria-hidden="true">&times;</button>')
    var date = this.collection.dimension(function (d) { return new Date(d.get('today')) }),
      dates = date.group(d3.time.day)

    this.barChart = BarChart()
      .collection(options.collection)
      .dimension(date)
      .group(dates)
      .round(d3.time.day.round)
      .x(d3.time.scale()
        .domain([new Date(2013, 9, 1), new Date(2013, 11, 20)])
        .range([0, 1400]))
      .on('brush', function () {
        if (!d3.event.target.empty()) {
          self.collection.trigger('filtered')
        }
      })
    this.listenTo(this.collection, 'filtered', this.render)
    this.listenTo(this.collection, 'firstfetch change', this.updateDomain)
  },

  render: function () {
    if (!this.collection.length) return this
    d3.select(this.el).call(this.barChart)
    return this
  },

  updateDomain: function () {
    var dimension = this.barChart.dimension()
    var bottom = dimension.bottom(1)
    var top = dimension.top(1)

    if (bottom & top) {
      this.barChart.x()
        .domain([bottom[0].getDate(), top[0].getDate()])
    }
  },

  open: function () {
    this.trigger('opened')
    this.render()
  },

  close: function () {
    this.trigger('closed')
  },

  noop: function (e) {
    e.stopPropagation()
  }
})
