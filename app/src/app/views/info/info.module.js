/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

//  angular.module('app', []);

  angular.module('app').config(config);

  config.$inject = [ '$stateProvider' ];

  function config($stateProvider) {

    $stateProvider.state('info', {
      url: '/info',
      templateUrl : 'html/info.html',
      controller : 'InfoController',
      controllerAs : 'vm',
      title: 'System Information'
    });
  }

})();