var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');


//var db = 'mongodb://localhost/flipkart';
var db = 'mongodb://products:Akshay123@ds159129.mlab.com:59129/commodity-search';
mongoose.connect(db);


var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


var Mobiles = require('../model/amazon');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/', function (req, res) {
    // Mobiles.create({

    //     Producturl: req.body.Producturl

    //   },


    var purl = req.body.url


    console.log(purl)

    request(purl, function (error, response, html) {


        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);
            var title, price;
            var json = {
                title: "",
                price: ""
            };



            //product title
            $(' span#productTitle ').each(function (i, element) {
                var el = $(this);
                var title = el.text().trim();

                // console.log(title);
                json.title = title;
            })


            //price 
            $(' td.a-span12 span.a-color-price ').each(function (i, element) {
                var el = $(this);
                var price = el.text();
                // console.log(price);
                json.price = price;
            })

            //           fs.writeFile('amazon.json', JSON.stringify(json, null, 4), function(err){

            //             console.log('File successfully written! - Check your project directory for the output.json file');



            // })


            Mobiles.find({
                    "$or": [{
                        "$text": {
                            "$search": json.title
                        }
                    }]
                }, {
                    "score": {
                        "$meta": "textScore"
                    }
                })
                .sort({
                    "score": {
                        "$meta": "textScore"
                    }
                })
                .limit(2)
                .exec(function (err, items) {
                    if (err) console.log("Error Finding Query " + err);
                    res.send(items);
                });



        }

    });


});


module.exports = router;