'use strict';

angular.module('qMeeting')
.factory('Dataservice', function ($http, localStorageService, ENV) {

  var obj = {
    getData: function() {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/venues",{headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    postData: function(data) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path+"api/v1/venues",{name: data.name, location: data.location}, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    putData: function(data) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      var url = ENV.api_path+"api/v1/venues/"+data.id;
      return $http.put(url,{name: data.name, location: data.location}, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    searchData: function(data) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/venues?query="+data,{headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    delData: function(data) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      var url = ENV.api_path+"api/v1/venues/"+data.id;
      return $http.delete(url, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    getRoomData: function(venue_id) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/venues/"+venue_id+"/meeting_rooms",{headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    putRoomData: function(data , venue_id) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      var url = ENV.api_path+"api/v1/venues/"+venue_id+"/meeting_rooms/"+data.id;
      return $http.put(url,{name: data.name , seating_capacity: data.seating_capacity, ac: data.ac, wifi: data.wifi, tv: data.tv, microphone: data.microphone, projector: data.projector,speaker: data.speaker }, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    getPaginate: function(data) { 
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      var url = ENV.api_path+"api/v1/venues?current_page="+data;
      return $http.get(url, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    postRoomData: function(data, venue_id) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path+"api/v1/venues/"+venue_id+"/meeting_rooms",{name: data.name , seating_capacity: data.seating_capacity, ac: data.ac, wifi: data.wifi, tv: data.tv, microphone: data.microphone, projector: data.projector,speaker: data.speaker }, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    meetdelData: function(data) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      var url = ENV.api_path+"api/v1/venues/"+data.venue_id+"/meeting_rooms/"+data.id;
      return $http.delete(url, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure)
    }

  };
  return obj;
});
