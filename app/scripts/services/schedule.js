'use strict';

angular.module('qMeeting')
.factory('Scheduleservice', function ($http, ENV, localStorageService) {

  var obj = {
    getMeetingRooms: function(venue_id) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/venues/"+venue_id+"/meeting_rooms",{headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    getVenues: function(data) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/venues", {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    getMyMeetings: function(data) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/meetings",{headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    filterMyMeetings: function(data, roomid) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/meetings?owner_id="+data.owner_id+"&meeting_room_id="+roomid+"&invitee_id="+data.invitee_id,{headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    }, 

    postData: function(data, obj) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path+"api/v1/meetings",{name: data.name, from_time: data.from_time, to_time: data.to_time, date: data.date, description: data.description, meeting_room_id: obj.roomId}, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    updateMeeting: function(data, obj, meetingObj) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.put(ENV.api_path+"api/v1/meetings/"+meetingObj.id,{name: data.name, from_time: data.from_time, to_time: data.to_time, date: data.date, description: data.description, meeting_room_id: obj.roomId, meeting_id: meetingObj.id}, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    getUsers: function() {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/users", {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    getInviteeAvail: function(data, meetingObj) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/invitee/availability?invitee_id="+data.invitee.id+"&meeting_id="+meetingObj.id, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    postInvitees: function(data, meetingObj) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path+"api/v1/meetings/"+meetingObj.id+"/invitations",{invitee_id: data.invitee.id}, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    updateInvitees: function(data, obj) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.put(ENV.api_path+"api/v1/meetings/"+data.meetingObj.meetingInfo.id+"/invitations/"+localStorageService.get('user-id'),{rsvp_status: obj}, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    getInvitees: function(meetingObj) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/meetings/"+meetingObj.id+"/invitations", {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    getAvail: function(id, from_time, to_time, date, mtgId) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      console.log(mtgId)
      return $http.get(ENV.api_path+"api/v1/meeting_room/availability?meeting_room_id="+id+"&from_time="+from_time+"&to_time="+to_time+"&date="+date+"&meeting_id="+mtgId, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    deleteInvitation: function(meetingObj, obj) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.delete(ENV.api_path+"api/v1/meetings/"+meetingObj.id+"/invitations/"+obj.id, {headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    addComment: function(data,detailsObj,commenter){
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path+"api/v1/meetings/"+detailsObj.meetingObj.meetingInfo.id+"/comments",{comments: data.comments ,commenter: data.commenter},{headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

    getComments: function(data){
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path+"api/v1/meetings/"+data.meetingObj.meetingInfo.id+"/comments",{headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    },

     
    deletecomment: function(data){
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.delete(ENV.api_path+"api/v1/meetings/"+data.meeting_id+"/comments/"+data.id,{headers: {"Authorization": localStorageService.get('qmeet-auth-token')}}).then(success, failure);
    }

  };
  return obj;
});