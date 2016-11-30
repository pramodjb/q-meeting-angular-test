'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('qMeeting'));

  var getapi, scope, deferred, loginservice, $location, $injector;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($q, $controller, $rootScope, Loginservice) {

    scope = $rootScope.$new();
    deferred = $q.defer();
    loginservice = Loginservice;
    $location = $injector.get('$location');
    spyOn(Loginservice, 'getData').and.returnValue(deferred.promise);
    getapi = $controller('LoginCtrl', {
      $scope: scope
    });


    it('should call Loginservice getData function', function () {
      scope.$digest();
      deferred.resolve();
      getapi.login();
      expect(loginservice.getData).toHaveBeenCalled();
    });
  }));
});


