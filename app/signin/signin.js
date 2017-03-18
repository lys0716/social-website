'use strict';

angular.module('myApp.signin', [])
.controller('SignInCtrl', ['$http','$scope', '$state',function($http,$scope,$state) {
    $scope.callData = function(){
        console.log($scope.inputEmail);
        console.log($scope.inputPassword);
        $state.go('userinfo', {obj: {email: $scope.inputEmail, password: $scope.inputPassword}});
    }
}]);
