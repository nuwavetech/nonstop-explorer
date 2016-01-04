/* Copyright (c) 2016 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('app').controller('StorageController', StorageController);

  StorageController.$inject = [ '$scope', 'layout', 'explorer', 'cordova', '$timeout' ];

  function StorageController($scope, layout, explorer, cordova, $timeout) {
    var vm = this;
    vm.showListItem = showListItem;
    vm.showBreadcrumbItem = showBreadcrumbItem;
    vm.showPreviousItem = showPreviousItem;

    var fileTypes = [ "Unstructured", "Relative", "Entry Sequenced", "Key Sequenced" ];
    var level = {
      NODE : 0,
      VOL : 1,
      SUBVOL : 2,
      FILE : 3,
    };

    activate();

    function activate() {

      if (cordova.isCordovaApp()) {
        $scope.$on("cordova-backbutton", onBackButton);
      }

      vm.level = level;
      vm.displayLevel = level.NODE;
      vm.location = [];
      vm.displayItems = [];
      vm.displayIcon = 0;
      vm.progress = false;

      refreshView();
    }

    function onBackButton() {
      showPreviousItem();
    }

    function refreshView() {

      switch (vm.displayLevel) {
      case level.NODE:
        explorer.getVols().then(function(response) {
          vm.location[level.NODE] = response.data.node;
          layout.setToolbarTitle(response.data.node + ' Storage');
          vm.breadcrumb = vm.location;
          vm.displayItems = response.data.volumes;
          stopProgress();
          vm.listView = true;
        }, function(error) {
          layout.showErrorView();
        });
        startProgress();
        break;
      case level.VOL:
        explorer.getSubvols(vm.location[level.VOL]).then(function(response) {
          vm.displayItems = response.data.subvols;
          vm.breadcrumb = vm.location;
          stopProgress();
          vm.listView = true;
        }, function(error) {
          layout.showErrorView();
        });
        startProgress();
        break;
      case level.SUBVOL:
        explorer.getFiles(vm.location[level.VOL], vm.location[level.SUBVOL]).then(function(response) {
          vm.displayItems = response.data.files;
          vm.breadcrumb = vm.location;
          stopProgress();
          vm.listView = true;
        }, function(error) {
          layout.showErrorView();
        });
        startProgress();
        break;
      case level.FILE:
        explorer.getFileInfo(vm.location[level.VOL], vm.location[level.SUBVOL],
                vm.location[level.FILE]).then(
                function(response) {
                  vm.fileInfo = response.data.fileInfo;
                  vm.breadcrumb = vm.location;

                  /* Fixup items for display */
                  vm.fileInfo.fileTypeDesc = fileTypes[vm.fileInfo.fileType];
                  vm.fileInfo.ownerString = ((vm.fileInfo.owner & 0xff00) >> 8).toString() + ","
                          + (vm.fileInfo.owner & 0xff).toString();
                  vm.fileInfo.openTimeString = timeToString(vm.fileInfo.openTime);
                  vm.fileInfo.modificationTimeString = timeToString(vm.fileInfo.modificationTime);
                  vm.fileInfo.creationTimeString = timeToString(vm.fileInfo.creationTime);
                  vm.fileInfo.securityString = securityToString(vm.fileInfo.securityCode);
                  vm.fileInfo.eofString = vm.fileInfo.eof.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  vm.heading = vm.location[level.NODE] + ' ' + vm.location[level.VOL] + ' '
                          + vm.location[level.SUBVOL] + ' ' + vm.location[level.FILE];
                  stopProgress();
                  vm.listView = false;
                }, function(error) {
                  layout.showErrorView();
                });
        startProgress();
        break;
      default:
        break;
      }

      vm.displayIcon = vm.displayLevel;
    }

    function securityToString(security) {
      var letter = [ "A", "G", "O", "3", "N", "C", "U", "-" ];
      var string = letter[(security & 0xff000000) >> 24];
      string += letter[(security & 0x00ff0000) >> 16];
      string += letter[(security & 0x0000ff00) >> 8];
      string += letter[(security & 0x000000ff)];

      return string;
    }

    function showBreadcrumbItem($event, level) {
      vm.displayLevel = level;
      vm.location.length = vm.displayLevel + 1;
      $event.target.blur();
      refreshView();
    }

    function showListItem($event, item) {
      if (vm.displayLevel < level.FILE) {
        vm.location[++vm.displayLevel] = item;
      }

      $event.target.blur();
      refreshView();
    }

    function showPreviousItem() {
      if (vm.displayLevel > level.NODE) {
        vm.displayLevel--;
        vm.location.length = vm.displayLevel + 1;
        refreshView();
      }
    }

    function startProgress() {
      vm.progress = true;
    }

    function stopProgress() {
      vm.progress = false;
    }

    function timeToString(time) {
      var date = new Date();
      var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
      date.setTime((time / 1000) - 210866760000000);
      return date.toDateString() + ", " + date.toLocaleTimeString();
    }

  }
})();