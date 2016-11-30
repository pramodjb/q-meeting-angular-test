'use strict';

describe('Dataservice', function() {
  var dataservice, httpBackend;
  dataservice = null;
  httpBackend = null;
  beforeEach(module('qMeeting'));

  beforeEach(inject(function(_Dataservice_, $httpBackend) {
    dataservice = _Dataservice_;
    
    httpBackend = $httpBackend;
  }));

  describe('Service API returns success (Get Meeting Rooms)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      var venue_id = 1;

      apiResponse = { "data": [{ "id": 1, "name": "Mysore - 2nd Floor", "venue_id": 1,
      "seating_capacity": 4, "ac": true, "wifi": true, "tv": false, "speaker": false,
      "microphone": false, "projector": false } ] };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/venues/1/meeting_rooms").respond(function() {
        return [200, apiResponse];
      });         

      result = dataservice.getRoomData(venue_id);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });

    });
  });

  describe('Service API returns success (Pagination)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      var data = {
        "current_page" : 1
      }

      apiResponse = { "data": [{
        "id": 4,
        "name": "Denver",
        "location": "Qwinix Technologies Inc, Galvanize Boulder, 5th Floor, 1035 Pearl St, Boulder, CO 80302",
        "created_at": "2015-12-09T05:36:05.986Z",
        "updated_at": "2015-12-09T05:36:05.986Z",
        "meeting_rooms": []
      },
      ] };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/venues?current_page=1").respond(function() {
        return [200, apiResponse];
      });         

      result = dataservice.getPaginate(data);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });

    });
  });

  describe('Service API returns success (Create Meeting Room)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result, venue_id;

      var data = {
        "name" : "MR_1",
        "seating_capacity" : 2,
        "ac" : true,
        "wifi" : true
      }

      apiResponse = { };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/venues/1/meeting_rooms",{name: data.name , seating_capacity: data.seating_capacity, ac: data.ac, wifi: data.wifi, tv: data.tv, microphone: data.microphone, projector: data.projector,speaker: data.speaker }).respond(function() {
        return [200, apiResponse];
      });         

      result = dataservice.postRoomData(data, venue_id);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });

    });
  });

  describe('Service API returns success(Update Venues)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      var data = {
        "id" : 2
      }

      apiResponse = {};

      httpBackend.expectPOST("http://st.api.meetings.qwinixtech.com/api/v1/venues/"+data.id,{name: "Mysore", location: "Horizon, HIEMA Convention Center Road,"}).respond(function() {
        return [200, apiResponse];
      });

      result = dataservice.putData(data);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });

      // httpBackend.flush();
    });
  });

  describe('Service API returns success(Delete Venues)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      var data = {
        "id" : 1
      }

      apiResponse = {};

      httpBackend.expectDELETE("http://st.api.meetings.qwinixtech.com/api/v1/venues/"+data.id).respond(function() {
        return [200, apiResponse];
      });

      result = dataservice.delData(data);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('Service API returns success(Update Meeting Rooms)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result, venue_id;

      var data = {
        "id" : 2
      }

      apiResponse = {};

      httpBackend.expectPOST("http://st.api.meetings.qwinixtech.com/api/v1/venues/1/meeting_rooms/"+data.id).respond(function() {
        return [200, apiResponse];
      });

      result = dataservice.putRoomData(data, venue_id);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });

      // httpBackend.flush();
    });
  });

  describe('Service API returns success(Delete Meeting Rooms)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      var data = {
        "venue_id" : 1,
        "id" : 1
      }

      apiResponse = {};

      httpBackend.expectDELETE("http://st.api.meetings.qwinixtech.com/api/v1/venues/"+data.venue_id+"/meeting_rooms/"+data.id).respond(function() {
        return [200, apiResponse];
      });

      result = dataservice.meetdelData(data);
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('Service API returns success (Get Venues)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      apiResponse = { "data": [{"Name":"Mysore","Location":"2nd floor"}, 
      {"Name":"Mysore","Location":"1st floor"} ] };

      httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/venues").respond(function() {
        return [200, apiResponse];
      });         

      result = dataservice.getData();
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });

      // httpBackend.flush();
    });
  });

  describe('Service API returns success(Post Venues)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      apiResponse = {};

      httpBackend.expectPOST("http://st.api.meetings.qwinixtech.com/api/v1/venues",{name: "Mysore", location: "Horizon, HIEMA Convention Center Road,"}).respond(function() {
        return [200, apiResponse];
      });

      result = dataservice.postData({name: "Mysore", location: "Horizon, HIEMA Convention Center Road,"});
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });

      // httpBackend.flush();
    });
  });

  describe('Service API returns success(Search Venues)', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      var data = {
        "query" : "den"
      }      
      apiResponse = {"data": [
      {
        "id": 4,
        "name": "Denver",
        "location": "Qwinix Technologies Inc, Galvanize Boulder, 5th Floor, 1035 Pearl St, Boulder, CO 80302",
        "created_at": "2015-12-09T05:36:05.986Z",
        "updated_at": "2015-12-09T05:36:05.986Z",
        "meeting_rooms": []
      }
      ],
      "total_count": 1,
      "per_page": 4,
      "current_page": 1
    };

    httpBackend.expectGET("http://st.api.meetings.qwinixtech.com/api/v1/venues?query="+data,{name: "Mysore", location: "Horizon, HIEMA Convention Center Road,"}).respond(function() {
      return [200, apiResponse];
    });

    result = dataservice.searchData(data);
    result.then(function(response) {
      expect(response).toEqual(apiResponse);
    });

      // httpBackend.flush();
    });
  });



});