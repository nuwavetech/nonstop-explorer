/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
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
      config.params = {};
      config.params['suppress-status'] = true;
      config.method = 'POST';
      config.url = getUrl();
      config.data = request;
      $http.defaults.useXDomain = true;

      $http(config).then(function(response) {
        if (response.status == 200 && response.data.http.status == 200) {
          d.resolve(response.data);
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
      request.data = {};
      request.data.type = dictionaryName + '.GetCpuList';
      request.data.accept = dictionaryName + '.GetCpuListResult';
      request.data.value = {};
      request.data.value.requestCode = 6;

      return callApi(request);
    }

    function getFiles(volume, subvol) {
      var request = {};
      request.data = {};
      request.data.type = dictionaryName + '.GetFiles';
      request.data.accept = dictionaryName + '.GetFilesResult';
      request.data.value = {};
      request.data.value.requestCode = 3;
      request.data.value.volume = volume;
      request.data.value.subvol = subvol;

      return callApi(request);
    }

    function getFileInfo(volume, subvol, file) {
      var request = {};
      request.data = {};
      request.data.type = dictionaryName + '.GetFileInfo';
      request.data.accept = dictionaryName + '.GetFileInfoResult';
      request.data.value = {};
      request.data.value.requestCode = 4;
      request.data.value.volume = volume;
      request.data.value.subvol = subvol;
      request.data.value.filename = file;

      return callApi(request);
    }

    function getUrl() {
      return 'http://' + settings.getHostAddress() + '/api/v1/serverclass/=ne^pathmon/nesvr';
    }

    function getSubvols(volume) {
      var request = {};
      request.data = {};
      request.data.type = dictionaryName + '.GetSubvols';
      request.data.accept = dictionaryName + '.GetSubvolsResult';
      request.data.value = {};
      request.data.value.requestCode = 2;
      request.data.value.volume = volume;



      return callApi(request);
    }

    function getSystemInfo() {
      var request = {};
      request.data = {};
      request.data.type = dictionaryName + '.GetSystemInfo';
      request.data.accept = dictionaryName + '.GetSystemInfoResult';
      request.data.value = {};
      request.data.value.requestCode = 5;

      return callApi(request);
    }

    function getVols() {
      var request = {};
      request.data = {};
      request.data.type = dictionaryName + '.GetVolumes';
      request.data.accept = dictionaryName + '.GetVolumesResult';
      request.data.value = {};
      request.data.value.requestCode = 1;

      return callApi(request);
    }

  }

})();
