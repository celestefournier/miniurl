'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShortenerSchema = new Schema({
  alias: {
    type: String
  },
  url: {
    type: String,
    required: 'Please enter a URL'
  },
  views: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('short-urls', ShortenerSchema);