'use strict';

angular.module('qMeeting').controller('VenueCtrl', function (Dataservice, $location, localStorageService, $scope) {
  var vm = this;
  vm.dataObj = {};
  vm.details = {};
  vm.dataObjOld = {};
  vm.no_of_pages = {};
  vm.mtgObj = {};
  vm.mod = {};
  vm.selectedRow = 0;
  vm.selectedPage = 1;

  vm.errorMsgFlag = false;
  vm.namelengthFlag = false;
  vm.errorMsg = false;
  vm.getFlag = false;
  vm.submitted = false;
  vm.editted = false;
  vm.mtgeditted =false;
  vm.msg = '';
  vm.msg1= '';

  if (localStorageService.get('qmeet-auth-token') === null) {
    if ($location.$$path === '/admin') {
      $location.path('/');
    }
  }

  vm.getData = function() {
    Dataservice.getData().then(function(response) {
      vm.dataObj = response.data;
      $scope.count = response.total_count;
      $scope.perpage = response.per_page;
      vm.mod = $scope.count%$scope.perpage;
      if (vm.mod !=0 ) {
        vm.no_of_pages =Math.floor($scope.count/$scope.perpage) +1;
      } else {
        vm.no_of_pages =Math.floor($scope.count/$scope.perpage);
      }

      Dataservice.getRoomData(vm.dataObj[0].id).then(function(response) {
        vm.mtgObj = response.data;
      });
    });
  };
  vm.getData();

  vm.fullDetails = function(obj, index) {
    vm.selectedRow = index;
    vm.details = angular.copy(obj);
    vm.getFlag = true;
    vm.dataObjOld = angular.copy(obj);
    Dataservice.getRoomData(vm.details.id).then(function(response) {
      vm.mtgObj = response.data;
      vm.msg="";
    });
  };

  vm.search = function() {
    Dataservice.searchData(vm.details.query).then(function(response) {
      vm.dataObj = response.data;
    });
  };

  vm.create = function(){
    vm.submitted = true;
    vm.getFlag = false;
    Dataservice.postData(vm.AddVenueform).then(function(response) {
      if (response.status === 201){
        vm.AddVenueform={};
        vm.getData();
        angular.element("#addVenue").modal("hide");
      }
      else if (response.error.name[0] == "has already been taken")
      {
        vm.errorMsgFlag = true;
        vm.getData();
      }
      else {
        vm.getData();
      }
    });
  };

  vm.edit = function() {
    if(vm.getFlag == false){
      vm.details = vm.dataObj[0];
    }
    Dataservice.putData(vm.details).then(function(response) {
      if (response.status === 200){
        if(vm.details.name == undefined || vm.details.location == undefined){
          vm.editted = true;
        }
        else{
          vm.getData();
          angular.element("#editVenue").modal("hide");
        }
      }
      else if (response.error.name[0] == "has already been taken")
      {
        vm.errorMsgFlag = true;
      }
      else {
        vm.errorMsg = true;
      }
    });
    vm.getData();
  };

  vm.del = function() {
    if(vm.getFlag == false){
      vm.details = vm.dataObj[0];
    }
    Dataservice.delData(vm.details).then(function(response) {
      vm.dataObj = response.data;
      vm.msg= response.message;
      vm.DeleteVenueForm={};
      if (response.status === 200){
        vm.getFlag = false;
        vm.getData();
      }
    });
  };

  vm.cancel = function(){
    vm.AddVenueform = {};
    vm.msg = "";
    vm.getData();
  }

  vm.cancelRoom = function(){
    vm.MeetingRoomform={};
    angular.element("#editRoom").modal("hide");
    vm.details = vm.mtgObj;
  }

  vm.roomcreate = function(){
    vm.submitted = true;
    if(vm.getFlag == false){
      vm.details = vm.dataObj[0];
    }
    Dataservice.postRoomData(vm.MeetingRoomform, vm.details.id).then(function(response) {
      if (response.status === 201){
        vm.MeetingRoomform={};
        Dataservice.getRoomData(vm.details.id).then(function(response) {
          vm.mtgObj = response.data;
        });
        angular.element("#addMeetingRoom").modal("hide");
      }
      else {
        vm.errorMsgFlag = true;
        if(response.error.name[0] == "is too short (minimum is 3 characters)"){
          vm.namelengthFlag = true;
        }
        Dataservice.getRoomData(vm.details.id).then(function(response) {
          vm.mtgObj = response.data;
        });
      }
    });
  };

  vm.editRoom=function(id) {
    var _index =0;
    for( _index =0; _index < vm.mtgObj.length ; _index++ ){
      if( vm.mtgObj[_index].id == id ){
        vm.editRoomObj=vm.mtgObj[_index];
      }
    }
  };

  vm.Roomedit = function () {
    if(vm.getFlag == false){
      vm.details = vm.dataObj[0];
    }
    vm.mtgeditted = true;
    Dataservice.putRoomData(vm.editRoomObj, vm.details.id).then(function(response) {
      if (response.status === 200){
        Dataservice.getRoomData(vm.details.id).then(function(response) {
          vm.mtgObj = response.data;
        });
        angular.element("#editRoom").modal("hide");
      }
      else if (response.status == 304)
      {
        Dataservice.getRoomData(vm.details.id).then(function(response) {
          vm.mtgObj = response.data;
        });
      }
      else {
        vm.errorMsg = true;
        Dataservice.getRoomData(vm.details.id).then(function(response) {
          vm.mtgObj = response.data;
        });
      }
    });
  };

  vm.roomDel=function(id) {
    vm.deleteRoomObj=id;
    vm.msg1 = '';
  };

  vm.delRoom = function() {
    if(vm.getFlag == false){
      vm.details = vm.dataObj[0];
    }
    Dataservice.meetdelData(vm.deleteRoomObj).then(function(response) {
      vm.dataObj = response.data;
      vm.getFlag = true;
      vm.msg1 = response.message;
      Dataservice.getRoomData(vm.details.id).then(function(response) {
        vm.mtgObj = response.data;
      });
    });
  }

  vm.paginate = function(n){
    vm.selectedRow = 0;
    vm.selectedPage = n;
    Dataservice.getPaginate(n).then(function(response) {
      vm.dataObj = response.data;
    });
  }

}).filter('range', function() {
  return function(val, range) {
    range = parseInt(range);
    for (var i=1; i<range+1; i++)
      val.push(i);
    return val;
  };
});


