'use strict';

describe('Loginservice', function() {
  var loginservice, httpBackend;
  loginservice = null;
  httpBackend = null;
  beforeEach(module('qMeeting'));

  beforeEach(inject(function(_Loginservice_, $httpBackend) {
    loginservice = _Loginservice_;
    httpBackend = $httpBackend;
  }));

  describe('Login Service API returns success', function() {
    xit("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      apiResponse = {email:"email@g.com",password:"Password@1"};

      httpBackend.expectPOST("http://st.api.meetings.qwinixtech.com/api/v1/authenticate",{email: "email@g.com", password: "Password@1"}).respond(function() {
        return [200, apiResponse];
      });

      result = loginservice.getData({email:"email@g.com",password:"Password@1"});
      result.then(function(response) {

        expect(response.data).toEqual(apiResponse);
      });


      httpBackend.flush();
    });
  });
});