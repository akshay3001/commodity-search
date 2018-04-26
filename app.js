 var express = require("express");

 var app = express();



 //flipkart routes
 // var flipkart = require("./public/routes/flipkart.js");
 var flipkart = require('./controllers/flipkart.controllers');
 app.use("/flipkart", flipkart);



 //amazon routes

 var amazon = require("./controllers/amazon.controller");
 app.use("/amazon", amazon);


 app.use(express.static('public'));
 




 app.listen(3000, function () {
     console.log(" port 3000");
 });
