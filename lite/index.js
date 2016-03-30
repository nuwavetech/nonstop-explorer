/* Copyright (c) 2016 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */

if (typeof XMLHttpRequest == "undefined")
  XMLHttpRequest = function() {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0")
    } catch (e) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0")
    } catch (e) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP")
    } catch (e) {
    }
    try {
      return new ActiveXObject("Microsoft.XMLHTTP")
    } catch (e) {
    }
    throw new Error("This browser does not support XMLHttpRequest.")
  };

var dictionaryName = 'io.nuwavetech.nonstopexplorer';

function getCpuList() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  if (isUserApiSelected() === true) {
    var request = {};
    request.method = 'GET';
    request.url = getServerUrlPrefix() + '/explore/v1/cpu';
  } else {
    var request = {};
    request.data = {};
    request.data.requestCode = 6;
    request.requestType = dictionaryName + '.GetCpuList';
    request.acceptType = dictionaryName + '.GetCpuListResult';
    request.method = 'POST';
    request.url = getNativeApiUrl();
  }

  var response = sendRequest(request);

  return;
}

function getFiles() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  if (isUserApiSelected() === true) {
    var request = {};
    request.method = 'GET';
    request.url = getServerUrlPrefix() + '/explore/v1/volume/$oss/subvolume/zx000000/file';
  } else {
    var request = {};
    request.data = {};
    request.data.requestCode = 3;
    request.data.volume = "$OSS";
    request.data.subvol = "ZX000000";
    request.requestType = dictionaryName + '.GetFiles';
    request.acceptType = dictionaryName + '.GetFilesResult';
    request.method = 'POST';
    request.url = getNativeApiUrl();
  }

  var response = sendRequest(request);

  return;
}

function getFileInfo() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  if (isUserApiSelected() === true) {
    var request = {};
    request.method = 'GET';
    request.url = getServerUrlPrefix() + '/explore/v1/volume/$oss/subvolume/zx000000/file/pxlog';
  } else {
    var request = {};
    request.data = {};
    request.data.requestCode = 4;
    request.data.volume = "$OSS";
    request.data.subvol = "ZX000000";
    request.data.filename = "PXLOG";
    request.requestType = dictionaryName + '.GetFileInfo';
    request.acceptType = dictionaryName + '.GetFileInfoResult';
    request.method = 'POST';
    request.url = getNativeApiUrl();
  }

  var response = sendRequest(request);

  return;
}

function getNativeApiUrl() {
  var prefix = getServerUrlPrefix();
  if (typeof prefix === 'undefined') {
    return;
  }

  return prefix + '/lightwave/api/v1/serverclass/=ne^pathmon/nesvr';
}

function getServerUrlPrefix() {
  var hostPort = document.getElementById('hostPort').value;

  if (hostPort.length == 0) {
    setMessage(true, 'Please supply the LightWave Server process host name and port.');
    return;
  }

  return url = 'http://' + hostPort;
}

function getSubvols() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  if (isUserApiSelected() === true) {
    var request = {};
    request.method = 'GET';
    request.url = getServerUrlPrefix() + '/explore/v1/volume/$oss/subvolume';
  } else {
    var request = {};
    request.data = {};
    request.data.requestCode = 2;
    request.data.volume = "$OSS";
    request.requestType = dictionaryName + '.GetSubvols';
    request.acceptType = dictionaryName + '.GetSubvolsResult';
    request.method = 'POST';
    request.url = getNativeApiUrl();
  }

  var response = sendRequest(request);

  return;
}

function getSystemInfo() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  if (isUserApiSelected() === true) {
    var request = {};
    request.method = 'GET';
    request.url = getServerUrlPrefix() + '/explore/v1/system';
  } else {
    var request = {};
    request.data = {};
    request.data.requestCode = 5;
    request.requestType = dictionaryName + '.GetSystemInfo';
    request.acceptType = dictionaryName + '.GetSystemInfoResult';
    request.method = 'POST';
    request.url = getNativeApiUrl();
  }

  var response = sendRequest(request);

  return;
}

function getVolumes() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  if (isUserApiSelected() === true) {
    var request = {};
    request.method = 'GET';
    request.url = getServerUrlPrefix() + '/explore/v1/volume';
  } else {
    var request = {};
    request.data = {};
    request.data.requestCode = 1;
    request.requestType = dictionaryName + '.GetVolumes';
    request.acceptType = dictionaryName + '.GetVolumesResult';
    request.method = 'POST';
    request.url = getNativeApiUrl();
  }

  var response = sendRequest(request);

  return;
}

function isUserApiSelected() {
  var apis = document.getElementsByName('api');
  for (var i = 0, length = apis.length; i < length; i++) {
    if (apis[i].value === 'user' && apis[i].checked) {
      return true;
    }
  }

  return false;
}

function resetPage() {
  setMessage(false, '');
  document.getElementById('request').innerHTML = 'None';
  document.getElementById('response').innerHTML = 'None';
}

function sendRequest(request) {

  /* Fill the request display area. */
  var r = request.method + ' ' + request.url + '\r';

  if (request.method === 'POST') {
    var content = JSON.stringify(request.data);
    r += 'Content-Type: application/json\r';
    r += 'Content-Length: ' + content.length + '\r';
    r += 'lw-request-type: ' + request.requestType + '\r';
    r += 'lw-response-type: ' + request.acceptType + '\r\r';
    r += JSON.stringify(request.data, null, 2);
  } else {
    r += 'Content-Length: 0\r\r';
  }

  document.getElementById('request').innerHTML = r;

  /* Submit the request using the XMLHttpRequest object. */
  try {
    var http = new XMLHttpRequest();
    http.open(request.method, request.url, false);

    if (request.method === 'POST') {
      http.setRequestHeader('Content-Type', 'application/json');
      http.setRequestHeader('lw-request-type', request.requestType);
      http.setRequestHeader('lw-response-type', request.acceptType);
      http.send(content);
    } else {
      http.send();
    }
  } catch (e) {
    setMessage(true, 'HTTP error: ' + e.message);
    return;
  }

  /* Fill the response display area. */
  var r = 'HTTP/1.1 ' + http.status + ' ' + http.statusText + '\n';
  r += http.getAllResponseHeaders();
  r += '\r';
  document.getElementById('response').innerHTML = r;

  try {
    /* Attempt to convert the response to a Javascript object. */
    var response = eval('(' + http.response + ')');

    /* Add the response JSON to the response display area. */
    document.getElementById('response').innerHTML += JSON.stringify(response, null, 2);
    setMessage(false, 'The request was successful.');
    return response;
  } catch (e) {
    setMessage(true, 'An unknown error occurred.');
    document.getElementById('response').innerHTML = 'None';
    return;
  }

  return;
}

function setMessage(isError, message) {
  var div = document.getElementById('message');
  div.innerHTML = message;
  if (isError) {
    div.style.color = 'red';
  } else {
    div.style.color = 'green';
  }
}

/** End of file. */