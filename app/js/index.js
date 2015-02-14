'use strict';

// lib
require('./lib/jquery-2.0.3.js')
require('./lib/locale.js')
require('./lib/leaflet-0.7.1.js')
require('./lib/bing_layer.js')
require('./lib/leaflet_providers.js')
require('../../data/locale.js')

// app

var mapFilter = require('./mapfilter/mapfilter.js')

var app = window.app = mapFilter({
  // target for github database
  url: 'https://github.com/digidem/wapichan-data/tree/master/monitoring_form_v1',

  // app container
  el: $("#app"),

  // An array of filters to explore the data.
  // `field` is the field/attribute to filter by
  // `type` should be `discrete` for string data and `continuous` for numbers or dates
  // `expanded` sets whether the filter view is expanded or collapsed by default
  filters: [{
    type: "continuous",
    field: "today",
    expanded: true
  }, {
    type: "discrete",
    field: "happening",
    expanded: true
  }, {
    type: "discrete",
    field: "people",
    expanded: true
  }],

  // Template to generate maptile urls. See http://leafletjs.com/reference.html#url-template
  tileUrl: 'http://{s}.tiles.mapbox.com/v3/gmaclennan.wapichana_background/{z}/{x}/{y}.jpg',
  // tileUrl: 'http://localhost:20008/tile/wapichana_background/{z}/{x}/{y}.png',

  // API key for Bing Maps use
  bingKey: 'AtCQswcYKiBKRMM8MHjAzncJvN6miHjgxbi2-m1oaFUHMa06gszNwt4Xe_te18FF'
})

window.tiles = require('./mapfilter/map_tile_utils.js')