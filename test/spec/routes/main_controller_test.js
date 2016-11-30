 'use strict';

describe('Testing Routes', function(){
  var $route, $rootScope, $location, $httpBackend;

  beforeEach(function(){
    module('qMeeting');

    inject(function($injector){
      $route = $injector.get('$route');
      $rootScope = $injector.get('$rootScope');
      $location = $injector.get('$location');
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.when('GET', 'views/main.html').respond('home');
      $httpBackend.when('GET', 'views/about.html').respond('about');
      $httpBackend.when('GET', 'views/getapi.html').respond('getapi');
      $httpBackend.when('GET', 'views/login.html').respond('login');
    });
  });

  xit('should navigate to home', function(){
    // navigate using $apply to safely run the $digest cycle
    $rootScope.$apply(function() {
      $location.path('/');
    });
    expect($location.path()).toBe('/');
    expect($route.current.templateUrl).toBe('views/main.html');
    expect($route.current.controller).toBe('MainCtrl');
  });

  xit('should navigate to about', function(){
    // navigate using $apply to safely run the $digest cycle
    $rootScope.$apply(function() {
      $location.path('/about');
    });
    expect($location.path()).toBe('/about');
    expect($route.current.templateUrl).toBe('views/about.html');
    expect($route.current.controller).toBe('AboutCtrl');
  });

  xit('should navigate to getapi', function(){
    // navigate using $apply to safely run the $digest cycle
    $rootScope.$apply(function() {
      $location.path('/getapi');
    });
    expect($location.path()).toBe('/getapi');
    expect($route.current.templateUrl).toBe('views/getapi.html');
    expect($route.current.controller).toBe('GetapiCtrl');
  });

  xit('should navigate to login', function(){
    // navigate using $apply to safely run the $digest cycle
    $rootScope.$apply(function() {
      $location.path('/login');
    });
    expect($location.path()).toBe('/login');
    expect($route.current.templateUrl).toBe('views/login.html');
    expect($route.current.controller).toBe('LoginCtrl');
  });

  xit('should redirect not registered urls to home', function(){
    // navigate using $apply to safely run the $digest cycle
    $rootScope.$apply(function() {
      $location.path('/other');
    });
    expect($location.path()).toBe('/');
    expect($route.current.templateUrl).toBe('views/main.html');
    expect($route.current.controller).toBe('MainCtrl');
  });
});