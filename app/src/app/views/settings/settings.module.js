/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

//  angular.module('app', []);

  angular.module('app').config(config);

  config.$inject = [ '$stateProvider' ];

  function config($stateProvider) {

    $stateProvider.state('settings', {
      url: '/settings',
      templateUrl : 'html/settings.html',
      controller : 'SettingsController',
      controllerAs : 'vm',
      title: 'Settings'
    });
  }

})();