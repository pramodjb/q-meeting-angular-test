'use strict';

angular
.module('qMeeting', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ui.router',
  'ngSanitize',
  'ngTouch',
  'LocalStorageModule',
  'config',
  '720kb.datepicker'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state("index", {
    url: "/",
    views: {
      "content": { templateUrl: "views/public/login.html" }
    }
  }).state("admin", {
    url: "/admin/venues",
    views: {
      "header": { templateUrl: "views/admin/header.html" },
      "content": { templateUrl: "views/admin/venues.html" },
      "footer": { templateUrl: "views/admin/footer.html" }
    }
  }).state("user", {
    url: "/user/meetings",
    views: {
      "header": { templateUrl: "views/user/header.html" },
      "content": {
        templateUrl: "views/user/meetings.html",
        controller: 'ScheduleCtrl',
        controllerAs: 'scheduleCtrl'
      },
      "footer": { templateUrl: "views/user/footer.html" }
    }
  });

  return $urlRouterProvider.otherwise('/');
});


