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

    function callApi(request) {
      var d = $q.defer();
      var config = {};
      config.headers = {};
      config.headers["Content-Type"] = "application/json";
      config.headers["lw-request-type"] = request.requestType;
      config.headers["lw-accept-type"] = request.acceptType;
      config.params = {};
      config.params['lw-suppress-status'] = true;
      config.method = 'POST';
      config.url = getUrl();
      config.data = request.data;
      $http.defaults.useXDomain = true;

      $http(config).then(function(response) {
        if (response.status == 200 && parseInt(response.headers("lw-http-status")) == 200) {
          d.resolve(response);
        } else {
          d.reject(response);
        }
      }, function(response) {
        d.reject(response);
      });

      return d.promise;
    }

    function getCpuList() {
      var request = {};
      request.requestType = dictionaryName + '.GetCpuList';
      request.acceptType = dictionaryName + '.GetCpuListResult';
      request.data = {};
      request.data.requestCode = 6;

      return callApi(request);
    }

    function getFiles(volume, subvol) {
      var request = {};
      request.requestType = dictionaryName + '.GetFiles';
      request.acceptType = dictionaryName + '.GetFilesResult';
      request.data = {};
      request.data.requestCode = 3;
      request.data.volume = volume;
      request.data.subvol = subvol;

      return callApi(request);
    }

    function getFileInfo(volume, subvol, file) {
      var request = {};
      request.requestType = dictionaryName + '.GetFileInfo';
      request.acceptType = dictionaryName + '.GetFileInfoResult';
      request.data = {};
      request.data.requestCode = 4;
      request.data.volume = volume;
      request.data.subvol = subvol;
      request.data.filename = file;

      return callApi(request);
    }

    function getUrl() {
      return 'http://' + settings.getHostAddress() + '/api/v1/serverclass/=ne^pathmon/nesvr';
    }

    function getSubvols(volume) {
      var request = {};
      request.requestType = dictionaryName + '.GetSubvols';
      request.acceptType = dictionaryName + '.GetSubvolsResult';
      request.data = {};
      request.data.requestCode = 2;
      request.data.volume = volume;



      return callApi(request);
    }

    function getSystemInfo() {
      var request = {};
      request.requestType = dictionaryName + '.GetSystemInfo';
      request.acceptType = dictionaryName + '.GetSystemInfoResult';
      request.data = {};
      request.data.requestCode = 5;

      return callApi(request);
    }

    function getVols() {
      var request = {};
      request.requestType = dictionaryName + '.GetVolumes';
      request.acceptType = dictionaryName + '.GetVolumesResult';
      request.data = {};
      request.data.requestCode = 1;

      return callApi(request);
    }

  }

})();
