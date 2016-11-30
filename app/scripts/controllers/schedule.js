 'use strict';

 angular.module('qMeeting')
 .controller('ScheduleCtrl', function (Scheduleservice, localStorageService, $location, $window) {

  var vm = this, i = 0;
  vm.dataObj = {};
  vm.meetingRooms = {};
  vm.meetingsDetails = {};
  vm.scheduleform = {};
  vm.dataError = {};
  vm.meetingLastObj = {};
  vm.users = [];
  vm.invitees = {};
  vm.detailsObj  = {};
  vm.invitees_res = {};
  vm.room_details = {};
  vm.commentsObj ={};
  vm.mymeetingsfilter = {};
  vm.filterObj = {};
  vm.meeting_room_avail = '';
  vm.meetings= {};
  vm.inviteeMeetings = {};
  vm.inviteeName = '';
  vm.commentere='';
  vm.submitted = false;
  vm.errorMsg = false;
  vm.dataErrorMsg = false;
  vm.scheduleSuccess = false;
  vm.inviteeErr = false;
  vm.uniqErr = false;
  vm.avail = true;
  vm.checkErr = false;
  vm.invitee_avail = true;
  vm.invitee_available = false;
  vm.edit_meeting_flag = false;
  vm.toggle=false;

  vm.currentUserId = localStorageService.get('user-id');

  if (localStorageService.get('qmeet-auth-token') === null) {
    if ($location.$$path === '/user/meetings') {
      $location.path('/');
    }
  }

  if (localStorageService.get('qmeet-role') === 'user') {
    if ($location.$$path === '/') {
      $location.path('/user/meetings');
    }
  }

  Scheduleservice.getUsers().then(function(response) {
    vm.allusers = response.data;
    for(var _idx=0; _idx < response.data.length ; _idx++){
      if(vm.currentUserId != response.data[_idx].id){
        var _temp = response.data[_idx];
        vm.users.push(_temp);
      }
    }
  });

  vm.info = function(){
    vm.filterObj = {};
    Scheduleservice.getVenues().then(function(response) {
      var _tempData = response.data;
      var _objIndex=0;
      var _objRoomIndex=0;
      var _tempArr = [], detailsArr = [];
      for(_objIndex =0; _objIndex < _tempData.length; _objIndex++){
        for( _objRoomIndex=0; _objRoomIndex < _tempData[_objIndex].meeting_rooms.length;  _objRoomIndex++){

          var _tempRoomInfoObj = { 'roomId': _tempData[_objIndex].meeting_rooms[_objRoomIndex].id,
          'roomName':  _tempData[_objIndex].name +" - "+ _tempData[_objIndex].meeting_rooms[_objRoomIndex].name,
          'roomDetails': _tempData[_objIndex].meeting_rooms[_objRoomIndex]};

          _tempArr.push(_tempRoomInfoObj);
        }
      }
      vm.meetingRooms = _tempArr;

      Scheduleservice.getMyMeetings().then(function(response) {
        vm.dataObj = response.data;
        for(var _resIndex =0; _resIndex < vm.dataObj.length; _resIndex++){
          for(var  _tempArrIndex=0; _tempArrIndex < _tempArr.length;  _tempArrIndex++){
            if(vm.dataObj[_resIndex].meeting_room_id == _tempArr[_tempArrIndex].roomId){
              var _meetingInfoObj = { 'roomLocation': _tempArr[_tempArrIndex].roomName,
              'meetingInfo':  vm.dataObj[_resIndex], 'meetingRoomDetails': _tempArr[_tempArrIndex].roomDetails };

              detailsArr.push(_meetingInfoObj);
            }
          }
        }
        vm.meetingsDetails = detailsArr;
      });
    });
  };

  vm.info();

  vm.details = function(obj) {
    vm.submitted=false;
    Scheduleservice.getInvitees(obj.meetingInfo).then(function(response) {
      vm.invitees_res = response.data;
      vm.detailsObj = {'meetingObj': angular.copy(obj), 'invitees' : vm.invitees_res };
      Scheduleservice.getComments(vm.detailsObj).then(function(response) {
        vm.commentsObj = response.data;
      });
    });
  };

  vm.meetingAvailability = function(){
    if(vm.edit_meeting_flag == true){
      var lastMtgId =  {};
      lastMtgId = vm.meetingLastObj.id;
    }
    Scheduleservice.getAvail(vm.room_details.roomId, vm.scheduleform.from_time, vm.scheduleform.to_time, vm.scheduleform.date, lastMtgId).then(function(response) {
      vm.meetings = response.data;
      if(response.availability_status === true){
        vm.meeting_room_avail = true;
        vm.checkErr = false;
        vm.meeting_room_avail_msg = "Meeting Room Available";
      }
      else if(response.status === 422){
        vm.checkErr = true;
        vm.room_details = {};
        vm.meetings = {};
      }
      else{
        vm.meeting_room_avail = false;
        vm.checkErr = false;
        vm.meeting_room_avail_msg = "Meeting Room Not available";
      }
    });
  }

  vm.schedule = function(){
    vm.submitted = true;
    vm.toggle=false;
    Scheduleservice.postData(vm.scheduleform, vm.room_details).then(function(response) {
      if (response.status === 200){
        vm.info();
        vm.meetingLastObj = response.data;
        vm.scheduleSuccess = true;
        vm.inviteeErr = false;
        vm.meeting_room_avail_msg = "";
        vm.checkErr = false;
        vm.toggle=true;
      }
      else if (response.message == "Invalid Input"){
        vm.errorMsg = true;
         vm.toggle=false;
      }
      else{
        vm.errorMsg = false;
        vm.dataError = response.error;
        vm.dataErrorMsg = true;
        vm.invitee_avail = {};
        vm.toggle=false;
      }
    });
  };

  vm.invite = function(){
    if(vm.scheduleSuccess){
      Scheduleservice.postInvitees(vm.inviteesForm, vm.meetingLastObj).then(function(response) {
        if (response.status === 201){
          vm.uniqErr = false;
          Scheduleservice.getInvitees(vm.meetingLastObj).then(function(response) {
            vm.detailsObj.invitees = response.data;
          });
        }
        else{
          vm.uniqErr = true;
        }
      });
    }
    else{
      vm.inviteeErr = true;
    }
  };

  vm.inviteeAvailability = function(){
    vm.inviteeName = vm.inviteesForm.invitee.name;
    Scheduleservice.getInviteeAvail(vm.inviteesForm, vm.meetingLastObj).then(function(response) {
      vm.inviteeMeetings = response.data;
      if(response.availability_status === true){
        vm.invitee_avail = true;
        vm.invite();
        vm.invitee_available = true;
      }
      else if(response.availability_status === false){
        vm.invitee_avail = false;
        vm.invitee_available = false;
      }
    });
  }

  vm.edit = function(){
    vm.edit_meeting_flag = true;
    vm.scheduleSuccess = false;
    vm.detailsObj.invitees = {};
    vm.inviteesForm.invitee = {};
    vm.invitee_avail = true;
    vm.room_details = {};
    vm.inviteeMeetings = {};
    vm.detailsObj.invitees.invitee = {};
     vm.toggle=false;
  }

  vm.updateMeeting = function(){
    vm.edit_meeting_flag = false;
    vm.inviteeName = '';
    vm.detailsObj.invitees = {};
    Scheduleservice.updateMeeting(vm.scheduleform, vm.room_details, vm.meetingLastObj).then(function(response) {
      if (response.status === 200){
        vm.info();
        vm.meetingLastObj = response.data;
        vm.scheduleSuccess = true;
        vm.inviteeErr = false;
        vm.meeting_room_avail_msg = "";
        vm.checkErr = false;
         vm.toggle=true;
      }
      else if (response.message == "Invalid Input"){
        vm.errorMsg = true;
         vm.toggle=false;
      }
      else{
        vm.errorMsg = false;
        vm.dataError = response.error;
        vm.dataErrorMsg = true;
         vm.toggle=false;
      }
    });
  };

  vm.rsvp= function(obj){
    Scheduleservice.updateInvitees(vm.detailsObj, obj).then(function(response) {
      if (response.status === 200){
        Scheduleservice.getInvitees(vm.detailsObj.meetingObj.meetingInfo).then(function(response) {
          vm.detailsObj.invitees = response.data;
        });
      }
      else{
        vm.uniqErr = true;
      }
    });
  };

  vm.deleteInvitation = function(obj){
    Scheduleservice.deleteInvitation(vm.meetingLastObj, obj).then(function(response) {
      if(response.status === 200) {
        Scheduleservice.getInvitees(vm.meetingLastObj).then(function(response) {
          vm.detailsObj.invitees = response.data;
        });
      }
    })
  }

  vm.done = function(){
    vm.inviteeName = '';
    vm.detailsObj.invitees = {};
    vm.inviteesForm = {};
    vm.scheduleSuccess = false;
    vm.inviteeErr = false;
    vm.uniqErr = false;
    angular.element("#schedule").modal("hide");
    vm.info();
    vm.scheduleform={};
    vm.meetings = {};
    vm.room_details = {};
    vm.invitee_available = true;
    vm.invitee_available = '';
    vm.toggle=false;
  }

  vm.comment=function(){
    vm.submitted=true;
    vm.commenter = localStorageService.get('curent_user-name');
    Scheduleservice.addComment(vm.AddCommentform,vm.detailsObj,vm.commenter).then(function(response) {
      if(response.status === 201) {
        vm.AddCommentform={};
        vm.commentsObj= response.data;
        vm.submitted=false;
        vm.commentere='';

      }
      Scheduleservice.getComments(vm.detailsObj).then(function(response) {
        vm.commentsObj = response.data;
      });
    });
  }

  vm.Del=function(obj){
   Scheduleservice.deletecomment(obj).then(function(response) {
      if(response.status === 200) {
        Scheduleservice.getComments(vm.detailsObj).then(function(response) {
          vm.commentsObj = response.data;
        });
      }
      else
      {
        vm.commentere=response.message;
      }
    });
 }

  vm.cancel = function(){
    vm.scheduleform = {};
    vm.inviteesForm = {};
    vm.invitees = {};
    vm.dataErrorMsg = false;
    vm.scheduleSuccess = false;
    vm.inviteeErr = false;
    vm.uniqErr = false;
  }

  vm.no = function(){
    vm.invitee_avail = true;
  }

  vm.filterMeetings = function(){
    var filterdetailsArr = [], roomObj = {},roomid={};
    roomObj = vm.filterObj.meeting_room_id;
    if(roomObj){
      roomid = roomObj.roomId;
    }
    Scheduleservice.filterMyMeetings(vm.filterObj, roomid).then(function(response) {
      vm.mymeetingsfilter = response.data;
      for(var obj=0; obj < vm.mymeetingsfilter.length; obj++){
        var _meetingInfoObj = { 'roomLocation': vm.mymeetingsfilter[obj].meeting_room.name,
        'meetingInfo':  vm.mymeetingsfilter[obj], 'meetingRoomDetails': vm.mymeetingsfilter[obj].meeting_room };

        filterdetailsArr.push(_meetingInfoObj);
      }
      vm.meetingsDetails = filterdetailsArr;

    });
  }

});
