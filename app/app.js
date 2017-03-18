'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.home',
  'myApp.signin',
  'myApp.gallery',
  'myApp.d3',
  'myApp.userinfo',
  'ui.router',
  'ngSanitize',
  'angular-timeline',
  'angular-scroll-animate'
]).
config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signin');
  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: './home/home.html',
    controller: 'HomeCtrl'
  }
  var signInState = {
    name: 'signin',
    url: '/signin',
    templateUrl: './signin/signin.html',
    controller: 'SignInCtrl'
  }
  var galleryState = {
    name: 'gallery',
    url: '/gallery',
    templateUrl: './gallery/gallery.html',
    controller: 'GalleryCtrl'
  }
  var d3State = {
    name: 'd3',
    url: '/d3',
    templateUrl: './d3/d3.html',
    controller: 'D3'
  }
  var userInfoState = {
    name: 'userinfo',
    url: '/userinfo',
    params: {
      obj: null
    },
    templateUrl: './userinfo/userinfo.html',
    controller: 'UserInfoCtrl'
  }
  $stateProvider.state(homeState);
  $stateProvider.state(signInState);
  $stateProvider.state(galleryState);
  $stateProvider.state(d3State);
  $stateProvider.state(userInfoState);
});
