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

  var request = {};
  request.method = 'GET';
  request.url = getServerUrlPrefix() + '/explore/v1/cpu';

  var response = sendRequest(request);

  return;
}

function getFiles() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  var request = {};
  request.method = 'GET';
  request.url = getServerUrlPrefix() + '/explore/v1/volume/$oss/subvolume/safe/file';

  var response = sendRequest(request);

  return;
}

function getFileInfo() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  var request = {};
  request.method = 'GET';
  request.url = getServerUrlPrefix() + '/explore/v1/volume/$oss/subvolume/safe/file/guard';

  var response = sendRequest(request);

  return;
}

function getServerUrlPrefix() {
  var hostPort = document.getElementById('hostPort').value;

  if (hostPort.length == 0) {
    setMessage(true, 'Please supply the LightWave Server process host name and port.');
    return;
  }

  return url = 'https://' + hostPort;
}

function getSubvols() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  var request = {};
  request.method = 'GET';
  request.url = getServerUrlPrefix() + '/explore/v1/volume/$oss/subvolume';

  var response = sendRequest(request);

  return;
}

function getSystemInfo() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  var request = {};
  request.method = 'GET';
  request.url = getServerUrlPrefix() + '/explore/v1/system';

  var response = sendRequest(request);

  return;
}

function getVolumes() {

  resetPage();

  if (typeof getServerUrlPrefix() === 'undefined') {
    return;
  }

  var request = {};
  request.method = 'GET';
  request.url = getServerUrlPrefix() + '/explore/v1/volume';

  var response = sendRequest(request);

  return;
}

function resetPage() {
  setMessage(false, '');
  document.getElementById('request').innerHTML = 'None';
  document.getElementById('response').innerHTML = 'None';
}

function sendRequest(request) {

  /* Fill the request display area. */
  var r = request.method + ' ' + request.url + '\r';

  document.getElementById('request').innerHTML = r;

  /* Submit the request using the XMLHttpRequest object. */
  try {
    var http = new XMLHttpRequest();
    http.open(request.method, request.url, false);
    http.send();
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