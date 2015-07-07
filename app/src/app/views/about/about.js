/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('app').controller('AboutController', AboutController);

  AboutController.$inject = [ 'layout', 'explorer', 'cordova', '$window' ];

  function AboutController(layout, explorer, cordova, $window) {
    var vm = this;
    vm.openBrowser = openBrowser;

    activate();

    function activate() {
      vm.isCordovaApp = cordova.isCordovaApp();
      layout.setToolbarTitle('About NonStop Explorer');
    }

    function openBrowser(url) {
      /*
       * Use window open instead of anchor href so that cordova will know to
       * open the link in the device browser. In a web app a new tab is opened.
       */
      $window.open(url, "_system");
    }
  }
})();