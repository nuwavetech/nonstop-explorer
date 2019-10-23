/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('app').factory('settings', explorer);
  explorer.$inject = [ '$q' ];

  function explorer($q) {

    var methods = {
      getCpuUpdateInterval : getCpuUpdateInterval,
      getHost : getHost,
      getHostAddress : getHostAddress,     
      setHost : setHost,
      setCpuUpdateInterval : setCpuUpdateInterval,
    };

    var cpuUpdateInterval = 5;
    var defaultHost = 'https://lightwave-server.demo.nuwavetech.com';
    var host = defaultHost;

    return activate();

    function activate() {
      return methods;
    }

    function getHost() {
      return host;
    }

    function getHostAddress() {
      return host;
    }

    function getCpuUpdateInterval() {
      return cpuUpdateInterval;
    }

    function reset() {
      cpuUpdateInterval = 5;
      host = defaultHost
    }

    function setCpuUpdateInterval(value) {
      try {
        value = Number(value);
      } catch (e) {
        return false;
      }

      if (value >= 5 && value <= 60) {
        cpuUpdateInterval = value;
        return true;
      }

      return false;
    }

    function setHost(value) {
      if (value.length > 0) {
        host = value;
        return true;
      }

      return false;
    }

  }

})();
