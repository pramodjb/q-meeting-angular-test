 'use strict';

 describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('qMeeting'));

  var HeaderCtrl,
  scope, storageService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, localStorageService) {
    scope = $rootScope.$new();
    storageService =  localStorageService;
    HeaderCtrl = $controller('HeaderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  xit('should set the login status to false', function () {
    storageService.set('qmeet-auth-token', 'test');
    HeaderCtrl.checkLogin();
    expect(HeaderCtrl.loginStatus).toBe(false);
  });

  xit('should set the login status to true', function () {
    storageService.remove('qmeet-auth-token');
    HeaderCtrl.checkLogin();
    expect(HeaderCtrl.loginStatus).toBe(true);
  });

  xit('should set the login status to true', function () {
    HeaderCtrl.logout();
    expect(HeaderCtrl.loginStatus).toBe(true);
  });

});