'use strict';

angular.module('qMeeting')
.controller('HeaderCtrl', function ($rootScope, localStorageService, $location) {
  var vm = this;
  vm.user_name = {};
  vm.user_name = localStorageService.get('user-name');

  if (localStorageService.get('qmeet-role') == 'user' && $location.$$path == '/admin') {
    $location.path('/user');
  }

  if (localStorageService.get('qmeet-role') == 'admin' && $location.$$path == '/user') {
    $location.path('/admin');
  }

  vm.getRole = function() {
    return localStorageService.get('qmeet-role');
  };
  vm.logout = function () {
    localStorageService.remove('qmeet-auth-token');
    localStorageService.remove('qmeet-role');
    $location.path('/');
  };
});
