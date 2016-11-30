'use strict';

angular.module('qMeeting')
.controller('LoginCtrl', function ($rootScope, $window, Loginservice, $location, localStorageService) {

  var viewModel = this;
  viewModel.dataObj = {};
  viewModel.errorMsgFlag = false;
  viewModel.regex = $window.APP.regex;


  if (localStorageService.get('qmeet-role') === 'admin') {
    if ($location.$$path == '/') {
      $location.path('/admin/venues');
    }
  }
  if (localStorageService.get('qmeet-role') === 'user') {
    if ($location.$$path === '/') {
      $location.path('/user/meetings');
    }
  }

  viewModel.login = function(){

    Loginservice.getData(viewModel.Loginform).then(function(response) {
      viewModel.dataObj = response.data;
      if (response.status === 200) {
        localStorageService.set('qmeet-auth-token', response.data.data.auth_token);
        localStorageService.set('user-id', response.data.data.id);
        localStorageService.set('user-name', response.data.data.name);

        if (response.data.data.user_roles.length > 0){
          localStorageService.set('qmeet-role', response.data.data.user_roles[0]);
        }
        else {
          localStorageService.set('qmeet-role', 'user');
        }

        if (response.data.data.user_roles[0] == 'admin') {
          $location.path('/admin/venues');
        } 
        else {
          $location.path('/user/meetings');
        }
      }
      else {
        viewModel.errorMsgFlag = true;
      }
    });
  };
});

