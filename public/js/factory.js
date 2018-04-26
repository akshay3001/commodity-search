angular.module("app")
    .factory('serv', function ($http) {

        //Service call for getting data:
        var getData = {};

        getData.getDta = function () {
            return $http({
                method: "GET",
                url: 'https://jsonplaceholder.typicode.com/users'
            });
        };

        getData.postUrl = function (link) {
            return $http({
                method: "POST",
                url: 'http://localhost:3000/flipkart/flip',
                data: link
            });
        }

        return getData;


    });