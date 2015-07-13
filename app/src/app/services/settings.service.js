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
      getPort : getPort,
      setHost : setHost,
      setCpuUpdateInterval : setCpuUpdateInterval,
      setPort : setPort
    };

    var cpuUpdateInterval = 5;
    var host = 'lightwave-server.nuwavetech.io';
    var port = 80;

//    host = '54.175.83.41';
//    port = 80;

    return activate();

    function activate() {
      return methods;
    }

    function getHost() {
      return host;
    }

    function getHostAddress() {
      return host + ':' + port;
    }

    function getPort() {
      return port;
    }

    function getCpuUpdateInterval() {
      return cpuUpdateInterval;
    }

    function reset() {
      cpuUpdateInterval = 5;
      host = 'lightwave-server.nuwavetech.io';
      port = 80;
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

    function setPort(value) {
      try {
        value = Number(value);
      } catch (e) {
        return false;
      }

      if (value >= 1 && value <= 65535) {
        port = value;
        return true;
      }

      return false;
    }

  }

})();
