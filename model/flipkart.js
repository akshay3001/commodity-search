var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('product', new Schema({

    pid: String,
    title: String,
    imageurl: String,
    price: String,
    Producturl: String,
    color: String

}), 'Mobiles');

