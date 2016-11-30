'use strict';

angular.module('qMeeting')
.factory('Loginservice', function ($http, ENV) {
  var obj = {
    getData: function(data) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.post(ENV.api_path+"api/v1/authenticate",{email: data.email, password: data.password}).then(success, failure);
    }
  };
  return obj;
});