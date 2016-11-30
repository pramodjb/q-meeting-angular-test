'use strict';

angular.module('qMeeting')

.controller('HomeCtrl', function (localStorageService,$location) {
  var vm = this;
  vm.role = '';

  vm.init = function() {
    vm.role = localStorageService.get('qmeet-role');
  };

  vm.init();

  if (!localStorageService.get('qmeet-auth-token')) {
    $location.path('/login');
  }
});

