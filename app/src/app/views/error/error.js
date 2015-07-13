/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('app').controller('ErrorController', ErrorController);

  ErrorController.$inject = [ 'layout', 'explorer', 'cordova', '$window' ];

  function ErrorController(layout, explorer, cordova, $window) {
    var vm = this;
    vm.retry = retry;

    activate();

    function activate() {
    }

    function retry() {
      layout.returnFromErrorView();
    }
  }
})();