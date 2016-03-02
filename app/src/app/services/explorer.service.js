/* Copyright (c) 2016 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('app').factory('explorer', explorer);
  explorer.$inject = [ '$http', '$q', '$timeout', 'settings' ];

  function explorer($http, $q, $timeout, settings) {

    var methods = {
      getCpuList : getCpuList,
      getFiles : getFiles,
      getFileInfo : getFileInfo,
      getSubvols : getSubvols,
      getSystemInfo : getSystemInfo,
      getVols : getVols
    };

    var dictionaryName = 'io.nuwavetech.nonstopexplorer';

    return activate();

    function activate() {
      return methods;
    }

    function getCpuList() {
      var request = {};
      request.uri = '/explore/v1/cpu';
      request.method = 'GET';

      return sendRequest(request);
    }

    function getFiles(volume, subvol) {
      var request = {};
      request.uri = '/explore/v1/volume/' + volume + '/subvolume/' + subvol + '/file';
      request.method = 'GET';

      return sendRequest(request);
    }

    function getFileInfo(volume, subvol, file) {
      var request = {};
      request.uri = '/explore/v1/volume/' + volume + '/subvolume/' + subvol + '/file/' + file;
      request.method = 'GET';

      return sendRequest(request);
    }

    function getSubvols(volume) {
      var request = {};
      request.uri = '/explore/v1/volume/' + volume + '/subvolume';
      request.method = 'GET';

      return sendRequest(request);
    }

    function getSystemInfo() {
      var request = {};
      request.uri = '/explore/v1/system';
      request.method = 'GET';

      return sendRequest(request);
    }

    function getUrlPrefix() {
      return 'http://' + settings.getHostAddress();
    }

    function getVols() {
      var request = {};
      request.uri = '/explore/v1/volume';
      request.method = 'GET';

      return sendRequest(request);
    }

    function sendRequest(request) {
      var d = $q.defer();
      var config = {};
      config.method = request.method;
      config.url = getUrlPrefix() + request.uri;
      $http.defaults.useXDomain = true;

      $http(config).then(function(response) {
        if (response.status == 200) {
          d.resolve(response);
        } else {
          d.reject(response);
        }
      }, function(response) {
        d.reject(response);
      });

      return d.promise;
    }

  }

})();
