/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('cordova', []).factory('cordova', cordova);
  cordova.$inject = [ '$rootScope', '$window', '$timeout' ];

  function cordova($rootScope, $window, $timeout) {

    var service = {
      isCordovaApp : isCordovaApp,
      isDeviceReady : isDeviceReady
    };

    var cordovaApp = false;
    var deviceReady = false;
    var debouncingVolume = false;

    return activate();

    function activate() {
      cordovaApp = (typeof $window.cordova == 'object' ? true : false);

      /* Add listeners for cordova events, which we'll forward to the root scope. */
      $window.document.addEventListener('deviceready', onEvent);
      $window.document.addEventListener('pause', onEvent);
      $window.document.addEventListener('resume', onEvent);
      $window.document.addEventListener('backbutton', onEvent);
      $window.document.addEventListener('volumedownbutton', onEvent);
      $window.document.addEventListener('volumeupbutton', onEvent);
      $window.document.addEventListener('menubutton', onEvent);
      $window.document.addEventListener('searchbutton', onEvent);

      return service;
    }

    function isCordovaApp() {
      return cordovaApp;
    }

    function isDeviceReady() {
      return deviceReady;
    }

    function onEvent($event) {
      /* Look for device ready. */
      if (!deviceReady && $event.type === 'deviceready') {
        deviceReady = true;
        console.log('cordova device is ready');
      }

      /*
       * Debounce the volume buttons. Only allow a volumebutton event
       * every 500 ms.
       */
      if ($event.type.substr(0, 6) === 'volume') {
        if (debouncingVolume) {
          return;
        } else {
          debouncingVolume = true;
          $timeout(function() {
            debouncingVolume = false;
          }, 500);
        }
      }

      $rootScope.$broadcast('cordova-' + $event.type, $event);
    }
  }

})();
