angular.module("app")
    .controller("ctrl", function ($scope, $window, serv,$http) {
        $scope.link = {};
        chrome.tabs.query({
                'active': true,
                'windowId': chrome.windows.WINDOW_ID_CURRENT
            },
            function (tabs) {
                $scope.link.url= tabs[0].url;
                localStorage.setItem("url", $scope.link.url);
                //console.log('link from $scope.link is 1 : ', $scope.link);
            });




        //Service call for posting data:
        $scope.clickHereToGetLink = function () {
            serv.postUrl($scope.link).then(function (res) {
                $http.post('http://localhost:3000/flipkart/',res).then(function(res){
                    console.log(res);
                })
                console.log('res is: ', res);
                $scope.res = res.data;
                console.log('id is ',$scope.res._id);
            });
        };

      



        //get service call: we are not going to do this here because we dont need to get anything
        //right now

        // $scope.getUsers1 = function () {
        //     serv.getDta().then(function (res) {
        //         console.log('list of users ', res);
        //     });
        // };


    });