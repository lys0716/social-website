'use strict';

angular.module('myApp.userinfo', [])
    .controller('UserInfoCtrl', ['$http','$scope', '$stateParams', function($http,$scope,$stateParams) {
        $http({
            method:'POST',
            url:'http://127.0.0.1:5000/authentication',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            data:{username:$stateParams.obj.email,password:$stateParams.obj.password}
        })
            .then(function(resp){
                console.log(resp)
                if (resp.data.status !== 401) {
                    $scope.username = resp.data.message.username
                    $scope.hobby = resp.data.message.hobby
                }
            },function(error){
                console.log(error);
            });
    }
    ]);
