/* Copyright (c) 2016 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('app').controller('InfoController', InfoController);

  InfoController.$inject = [ 'layout', 'explorer'];

  function InfoController(layout, explorer) {
    var vm = this;

    activate();

    function activate() {
      explorer.getSystemInfo().then(function(response) {
        vm.info = response.data.systemInfo;
        vm.info.nodeName = response.data.node;
        layout.setToolbarTitle(vm.info.nodeName + ' System Info');
      }, function() {
        layout.showErrorView();
      });
    }
  }
})();