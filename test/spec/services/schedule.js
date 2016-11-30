'use strict';

describe('Scheduleservice', function() {
  var scheduleservice, httpBackend;
  scheduleservice = null;
  httpBackend = null;
  beforeEach(module('qMeeting'));

  beforeEach(inject(function(_Scheduleservice_, $httpBackend) {
    scheduleservice = _Scheduleservice_;

    httpBackend = $httpBackend;
  }));

  describe('Service API returns success(My Meetings list)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      apiResponse = { "data": [{"owner_id": 1,"from_datetime":"2016-11-12T11:30:00.000Z", "to_datetime":"2016-11-12T12:30:00.000Z", "from_time": "11:30", 
      "to_time": "12:30", "date": "2016-11-12", "meeting_room_id": 2, "description": "daily standup",
      "name": "standup"},  ] };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/meetings").respond(function() {
        return [200, apiResponse];
      });         

      result = scheduleservice.getMyMeetings();
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('Service API returns success(Meeting_rooms list )', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      apiResponse = { "data": [{"name": "MR Name 1",
      "venue_id": 5,
      "seating_capacity": 10,
      "ac": false,
      "wifi": false,
      "tv": false,
      "speaker": false,
      "microphone": false,
      "projector": false},  ] };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/venues/5/meeting_rooms").respond(function() {
        return [200, apiResponse];
      });         

      result = scheduleservice.getMeetingRooms(5);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('Service API returns success(Users list)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      apiResponse = { "data": [{"name": "Admin",
      "email": "admin@domain.com",
      "auth_token": "215a1c0f0155b4ba13798730b01b18f4",
      "user_roles": [
      "admin"
      ] } ] };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/users").respond(function() {
        return [200, apiResponse];
      });         

      result = scheduleservice.getUsers();
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('Service API returns success(Invitee availability)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result, invitee_id, meeting_id;

      var data = {
        "invitee" : { "id" : 5 }
      }

      apiResponse = {
        "data": [],
        "availability_status": true
      };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/invitee/availability?invitee_id=5&meeting_id=3").respond(function() {
        return [200, apiResponse];
      });         

      result = scheduleservice.getInviteeAvail(data, 3);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('Service API returns success(Invitees List)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result, meeting_id;

      apiResponse = {
        "data": [
        {
          "inviter_id": 10,
          "invitee_id": 10,
          "meeting_id": 2,
          "rsvp_status": null,
          "invitee": {
            "name": "User Name 1"
          }
        }
        ]
      }

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/meetings/2/invitations").respond(function() {
        return [200, apiResponse];
      });         

      result = scheduleservice.getInvitees(2);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('Service API returns success(Venues list)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      apiResponse = { "data": [{"Name":"Mysore","Location":"2nd floor"}, 
      {"Name":"Mysore","Location":"1st floor"} ] };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/venues").respond(function() {
        return [200, apiResponse];
      });         

      result = scheduleservice.getVenues();
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('Service API returns success(Meetings availability)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result, invitee_id, meeting_room_id, owner_id;

      apiResponse = {
        "data": [
        {
          "id": 2,
          "owner_id": 6,
          "from_datetime": "2015-12-10T11:30:00.000Z",
          "to_datetime": "2015-12-10T11:45:00.000Z",
          "from_time": "11:30",
          "to_time": "11:45",
          "date": "2015-12-10",
          "meeting_room_id": 2,
          "description": "Meeting 1",
          "name": "Meeting 1"
        }
        ],
        "availability_status": true
      };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/meeting_room/availability?meeting_room_id=2&from_time=11:30&to_time=11:45&date=2015-12-10&meeting_id=2").respond(function() {
        return [200, apiResponse];
      });         

      result = scheduleservice.filterMyMeetings(2, "11:30", "11:45", "2015-12-10", 2);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });
    });
});

describe('Service API returns success(Filter Meetings)', function() {
  it("returns a promise that will give the success callback", function() {

    var apiResponse, result, invitee_id, meeting_room_id, owner_id;

    var data = {
      "owner_id" : 2, 
      "invitee_id" : 2
    }

    apiResponse = {
      "data": [
      {
        "owner_id": 2,
        "from_datetime": "2016-11-12T11:30:00.000Z",
        "to_datetime": "2016-11-12T12:30:00.000Z",
        "from_time": "11:30",
        "to_time": "12:30",
        "date": "2016-11-12",
        "meeting_room_id": 2,
        "description": "daily standup",
        "name": "standup",
      }
      ]
    }

    httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/meetings?owner_id=2&meeting_room_id=2&invitee_id=2").respond(function() {
      return [200, apiResponse];
    });         

    result = scheduleservice.filterMyMeetings(data, 2);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });


  });
});

describe('Service API returns success(Comments)', function() {
  it("returns a promise that will give the success callback", function() {

    var apiResponse, result, invitee_id, meeting_room_id, owner_id;

    var data = {
      "meetingObj" : { "meetingInfo" : {  "id" :1 }}
    }

    apiResponse = {
      "data": [
      {
        "id": 7,
        "comments": "ac not working properly",
        "created_at": "2015-12-02T10:13:06.157Z",
        "updated_at": "2015-12-02T10:13:06.157Z",
        "meeting_id": 1,
        "commenter": "Suchithra"
      }
      ]
    };

    httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/meetings/1/comments").respond(function() {
      return [200, apiResponse];
    });         

    result = scheduleservice.getComments(data);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });
  });
});

describe('Service API returns success(Schedule Meeting)', function() {
  it("returns a promise that will give the success callback", function() {

    var apiResponse, result;

    var data = {
      "name": "Meeting name",
      "from_time": "11:30",
      "to_time": "11:45", 
      "date": "2016-11-12", 
      "description": "text"
    }

    var obj = {
      "roomId" : 1
    }



    apiResponse = {};

    httpBackend.expectPOST("http://st.api.meetings.qwinixtech.com/api/v1/meetings",{name: data.name, from_time: data.from_time, to_time: data.to_time, date: data.date, description: data.description, meeting_room_id: obj.roomId}).respond(function() {
      return [200, apiResponse];
    });

    result = scheduleservice.postData(data, obj);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });
  });
});

describe('Service API returns success(Send invites)', function() {
  it("returns a promise that will give the success callback", function() {

    var apiResponse, result;

    var data = {
      "invitee": { "id" : 1 }
    }

    var meetingObj = {
      "id" : 1
    }



    apiResponse = {};

    httpBackend.expectPOST("http://st.api.meetings.qwinixtech.com/api/v1/meetings/"+meetingObj.id+"/invitations",{invitee_id: data.invitee.id}).respond(function() {
      return [200, apiResponse];
    });

    result = scheduleservice.postInvitees(data, meetingObj);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });
  });
});

describe('Service API returns success(Add comments)', function() {
  it("returns a promise that will give the success callback", function() {

    var apiResponse, result;

    var data = {
      "comments": "text",
      "commenter" : 2
    }

    var detailsObj = {
      "meetingObj" : { "meetingInfo" : { "id" : 1 } }
    }



    apiResponse = {};

    httpBackend.expectPOST("http://st.api.meetings.qwinixtech.com/api/v1/meetings/"+detailsObj.meetingObj.meetingInfo.id+"/comments",{comments: data.comments ,commenter: data.commenter}).respond(function() {
      return [200, apiResponse];
    });

    result = scheduleservice.addComment(data,detailsObj);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });
  });
});

describe('Service API returns success(Update Meeting)', function() {
  it("returns a promise that will give the success callback", function() {

    var apiResponse, result;

    var data = {
      "name": "Meeting name",
      "from_time": "11:30",
      "to_time": "11:45", 
      "date": "2016-11-12", 
      "description": "text"
    }

    var obj = {
      "roomId" : 1
    }

    var meetingObj = {
      "id" :1
    }



    apiResponse = {};

    httpBackend.expectPUT("http://st.api.meetings.qwinixtech.com/api/v1/meetings/"+meetingObj.id,{name: data.name, from_time: data.from_time, to_time: data.to_time, date: data.date, description: data.description, meeting_room_id: obj.roomId, meeting_id: meetingObj.id}).respond(function() {
      return [200, apiResponse];
    });

    result = scheduleservice.updateMeeting(data, obj, meetingObj);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });
  });
});

describe('Service API returns success(Update invites)', function() {
  it("returns a promise that will give the success callback", function() {

    var apiResponse, result;

    var data = {
      "meetingObj": { "meetingInfo" : {"id" : 1}  }
    }

    var obj = "yes"

    apiResponse = {};

    httpBackend.expectPUT("http://st.api.meetings.qwinixtech.com/api/v1/meetings/"+data.meetingObj.meetingInfo.id+"/invitations/2",{rsvp_status: obj}).respond(function() {
      return [200, apiResponse];
    });

    result = scheduleservice.updateInvitees(data, obj);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });
  });
});

describe('Service API returns success(Delete Invitations)', function() {
  it("returns a promise that will give the success callback", function() {

    var apiResponse, result;

    var meetingObj = {
      "id" : 1
    }

    var obj = {
      "id" : 2
    }

    apiResponse = {};

    httpBackend.expectDELETE("http://st.api.meetings.qwinixtech.com/api/v1/meetings/"+meetingObj.id+"/invitations/"+obj.id).respond(function() {
      return [200, apiResponse];
    });

    result = scheduleservice.deleteInvitation(meetingObj, obj);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });
  });
});

describe('Service API returns success(Delete Comments)', function() {
  it("returns a promise that will give the success callback", function() {

    var apiResponse, result;

    var data = {
      "id" : 1,
      "meeting_id" : 2
    }

    apiResponse = {};

    httpBackend.expectDELETE("http://st.api.meetings.qwinixtech.com/api/v1/meetings/"+data.meeting_id+"/comments/"+data.id).respond(function() {
      return [200, apiResponse];
    });

    result = scheduleservice.deletecomment(data);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });
  });
});

});