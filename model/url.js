var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
  url1: String
});

module.exports = mongoose.model('url', product, 'urls');