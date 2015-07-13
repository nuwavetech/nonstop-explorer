/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('app').controller('SettingsController', SettingsController);

  SettingsController.$inject = [ 'settings', '$mdToast', 'layout' ];

  function SettingsController(settings, $mdToast, layout) {
    var vm = this;
    vm.reset = reset;
    vm.submit = submit;

    activate();

    function activate() {
      layout.setToolbarTitle('Settings');
      reset();
    }

    function reset() {
      vm.host = settings.getHost();
      vm.port = settings.getPort();
      vm.interval = settings.getCpuUpdateInterval();
    }

    function submit() {
      if (settings.setHost(vm.host) && settings.setPort(vm.port) && settings.setCpuUpdateInterval(vm.interval)) {
        $mdToast.show($mdToast.simple().content('The settings have been updated.'));
      } else {
        $mdToast.show($mdToast.simple().content('An unexpected error occurred while updating the settings.'));
      }
    }
  }
})();