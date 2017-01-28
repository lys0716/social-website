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
      // data:inputData
    })
        .then(function(resp){
          // if (resp.data.status !== 401) {
            $scope.events = resp.data;
          // } else {
          //   $state.go('signin');
          // }
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
    // $scope.postText = "";
    location.reload();
  }

  // var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. " +
  //             "Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor." +
  //             "Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, " +
  //             "ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor." +
  //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  $scope.side = '';

  // $scope.events = [{
  //   badgeClass: 'info',
  //   badgeIconClass: 'glyphicon-globe',
  //   title: 'First heading',
  //   when: '11 hours ago via Twitter',
  //   contentHtml: 'Some awesome content.'
  // }, {
  //   badgeClass: 'info',
  //   badgeIconClass: 'glyphicon-globe',
  //   title: 'Second heading',
  //   when: '12 hours ago via Twitter',
  //   contentHtml: 'More awesome content.'
  // }, {
  //   badgeClass: 'info',
  //   badgeIconClass: 'glyphicon-globe',
  //   title: 'Third heading',
  //   titleContentHtml: '<img class="img-responsive" src="http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg">',
  //   contentHtml: lorem,
  //   when: '13 hours ago via Twitter',
  //   footerContentHtml: '<a href="">Continue Reading</a>'
  // }];

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
