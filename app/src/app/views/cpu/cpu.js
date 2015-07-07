/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('app').controller('CpuController', CpuController);

  CpuController.$inject = [ '$scope', 'layout', 'explorer', 'settings', '$timeout', 'cordova' ];

  function CpuController($scope, layout, explorer, settings, $timeout, cordova) {
    var vm = this;

    var refreshTimer = null;
    var idleTimer = null;

    activate();

    function activate() {

      if (cordova.isCordovaApp()) {
        $scope.$on("cordova-pause", onPause);
        $scope.$on("cordova-resume", onResume);
      }

      /* Start the idle timer, so this updates won't run forever and eat up the
       * user's data plan. */
      startIdleTimer();

      /* Cancel timers when this controller is destoyed, or it will run forever. */
      $scope.$on("$destroy", function() {
        cancelRefreshTimer();
        $timeout.cancel(idleTimer);
      });

      refreshView();
    }

    function cancelRefreshTimer() {
      if (refreshTimer != null) {
        $timeout.cancel(refreshTimer);
        refreshTimer = null;
      }
    }

    function onPause() {
      cancelRefreshTimer();
      $timeout.cancel(idleTimer);
    }

    function onResume() {
      startIdleTimer();
      refreshView();
    }

    function refreshView() {
      explorer.getCpuList().then(function(response) {
        layout.setToolbarTitle(response.data.value.node + ' CPU Status');
        vm.cpuList = response.data.value.cpuList;
        for (var i = 0; i < vm.cpuList.cpuCount; i++) {
          if (vm.cpuList.cpu[i].cpuNumber < 10)
            vm.cpuList.cpu[i].cpuNumber = '0' + vm.cpuList.cpu[i].cpuNumber.toString();
          else
            vm.cpuList.cpu[i].cpuNumber = vm.cpuList.cpu[i].cpuNumber.toString();

          if (vm.cpuList.cpu[i].busy > 80)
            vm.cpuList.cpu[i].busyLevel = 2;
          else if (vm.cpuList.cpu[i].busy > 40)
            vm.cpuList.cpu[i].busyLevel = 1;
          else
            vm.cpuList.cpu[i].busyLevel = 0;
        }
      });

      startRefreshTimer();
    }

    function startIdleTimer() {
      idleTimer = $timeout(function(){layout.showDefaultView();}, 300 * 1000);
    }

    function startRefreshTimer() {
      refreshTimer = $timeout(refreshView, settings.getCpuUpdateInterval() * 1000);
    }
  }
})();