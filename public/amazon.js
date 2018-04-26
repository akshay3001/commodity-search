// var url = window.location.href;

// var regex = new RegExp("/([a-zA-Z0-9]{10})(?:[/?]|$)");


// if (url.match(regex)) {


// 	var pathname = new URL(url).pathname.split('/');

// 	var producttitle = pathname[1];
// 	console.log(producttitle);

// }

angular.module("app",[])
.controller("ctrl", function($scope){
	// $scope.url = $window.location.href;
});


//  function httpGetAsync(theUrl, callback)
// {
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.onreadystatechange = function() {
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//       callback(xmlHttp.responseText);
//     }
//    xmlHttp.open("POST", theUrl, true); // true for asynchronous
//    xmlHttp.send(producttitle);
// }


// httpGetAsync("http://127.0.0.1:3000/flipkart", function(response) {
//   console.log("recieved ... ", response);