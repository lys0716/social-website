'use strict';

angular.module('myApp.gallery', [])
    .controller('GalleryCtrl', ['$http','$scope','$state',function($http,$scope,$state) {
        var httpGet = function(inputData, urlStr) {
            $http({
                method:'GET',
                url:urlStr,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data:inputData
            })
                .then(function(resp){
                    if (resp.data.status !== 401) {
                        $scope.products = resp.data;
                    } else {
                        $state.go('signin');
                    }
                    console.log(resp.data);
                },function(error){
                    console.log(error);
                });
        };
        httpGet({}, "http://127.0.0.1:5000/gallery")
        $scope.plusOne = function(index) {
            $scope.products[index].likes += 1;
        };
        $scope.minusOne = function(index) {
            $scope.products[index].dislikes += 1;
        };

    }]);
