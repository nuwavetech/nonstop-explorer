/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

//  angular.module('app', []);

  angular.module('app').config(config);

  config.$inject = [ '$stateProvider' ];

  function config($stateProvider) {

    $stateProvider.state('error', {
      url: '/error',
      templateUrl : 'html/error.html',
      controller : 'ErrorController',
      controllerAs : 'vm',
      title: 'Error'
    });
  }

})();