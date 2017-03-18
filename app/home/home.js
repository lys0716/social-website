'use strict';

var HomeCtrl = function($rootScope, $document, $timeout, $scope, $http, $state) {

  var httpPost = function(inputData, urlStr) {
    $http({
      method:'POST',
      url:urlStr,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data:inputData
    })
        .then(function(resp){
          console.log(resp);
        },function(error){
          console.log(error);
        });
  };

  var httpGet = function(inputData, urlStr) {
    $http({
      method:'GET',
      url:urlStr,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
        .then(function(resp){
          if (resp.data.status !== 401) {
            $scope.events = resp.data;
          } else {
            $state.go('signin');
          }
          console.log(resp.data);
        },function(error){
          console.log(error);
        });
  };

  httpPost({}, 'http://127.0.0.1:5000/totalvisitor')

  httpGet({}, 'http://127.0.0.1:5000/timelinedata')

  $scope.callData = function(){
    httpPost({text:$scope.postText,time:new Date().getTime()}, 'http://127.0.0.1:5000/timelinedata')
    console.log("Post: " + $scope.postText + " at " + new Date().getTime())
    location.reload();
  }

  $scope.side = '';

  // optional: not mandatory (uses angular-scroll-animate)
  $scope.animateElementIn = function($el) {
    $el.removeClass('timeline-hidden');
    $el.addClass('bounce-in');
  };

  // optional: not mandatory (uses angular-scroll-animate)
  $scope.animateElementOut = function($el) {
    $el.addClass('timeline-hidden');
    $el.removeClass('bounce-in');
  };
};

angular.module('myApp.home', []).controller('HomeCtrl', HomeCtrl);
