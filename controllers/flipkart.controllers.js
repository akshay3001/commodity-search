var express = require('express');
var router = express.Router();
var Url = require('../model/url');
var mongoose = require('mongoose');


//  var db = 'mongodb://localhost/amazon';
var db = 'mongodb://products:Akshay123@ds159129.mlab.com:59129/commodity-search';
mongoose.connect(db);


var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


var Mobiles = require('../model/flipkart');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: true
}));


//for flipkart
router.post('/flip', function (req,res){
    var data = req.body;
  
    var link = new Url(data);
    link.save(function (error, url) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).send(url);
      }
    });
  });

  //end of flipkart router
  


router.post('/', function (req, res) {

    var title, price, imageurl, color;
    var json = {

        title: "",
        imageurl: "",

        price: "",

        color: ""


    };



    //   // Mobiles.create({

    //   //     Producturl: req.body.Producturl

    //   //   },
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
            $('._3eAQiD').each(function (i, element) {
                var el = $(this);
                var title = el.text().trim();

                // console.log(title);
                json.title = title;
            })

            //price 
            $(' div ._37U4_g ').each(function (i, element) {
                var el = $(this);
                var price = el.text();

                // console.log(price);
                json.price = price;
            })


            //     fs.writeFile('flipkart.json', JSON.stringify(json, null, 4), function(err){

            //             console.log('File successfully written!');
            // });




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
    })

})

module.exports = router;