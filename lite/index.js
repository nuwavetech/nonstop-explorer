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

function setMessage(isError, message) {
  var div = document.getElementById('message');
  div.innerHTML = message;
  if (isError) {
    div.style.color = 'red';
  } else {
    div.style.color = 'green';
  }
}

function getUrl() {
  var hostPort = document.getElementById('hostPort').value;

  if (hostPort.length == 0) {
    setMessage(true, 'Please supply the LightWave Server process host name and port.');
    return;
  }

  return url = 'http://' + hostPort + '/api/v1/serverclass/=ne^pathmon/nesvr';
}

function getSystemInfo() {

  /* Clear the result fields. */
  setMessage(false, '');
  document.getElementById('request').innerHTML = 'None';
  document.getElementById('response').innerHTML = 'None';

  /* Get the url. */
  var url = getUrl();
  if (typeof url == 'undefined') {
    return;
  }

  /* Send the request. */
  var request = {};
  request.data = {};
  request.data.requestCode = 5;
  request.requestType = dictionaryName + '.GetSystemInfo';
  request.acceptType = dictionaryName + '.GetSystemInfoResult';
  request.url = url;

  var response = postRequest(request);

  return;
}

function getCpuList() {

  /* Clear the result fields. */
  setMessage(false, 'None');
  document.getElementById('request').innerHTML = 'None';
  document.getElementById('response').innerHTML = 'None';

  /* Get the url. */
  var url = getUrl();
  if (typeof url == 'undefined') {
    return;
  }

  /* Send the request. */
  var request = {};
  request.data = {};
  request.data.requestCode = 6;
  request.requestType = dictionaryName + '.GetCpuList';
  request.acceptType = dictionaryName + '.GetCpuListResult';
  request.url = url;

  var response = postRequest(request);

  return;
}

function getFiles() {

  /* Clear the result fields. */
  setMessage(false, 'None');
  document.getElementById('request').innerHTML = 'None';
  document.getElementById('response').innerHTML = 'None';

  /* Get the url. */
  var url = getUrl();
  if (typeof url == 'undefined') {
    return;
  }

  /* Send the request. */
  var request = {};
  request.data = {};
  request.data.requestCode = 3;
  request.data.volume = "$OSS";
  request.data.subvol = "ZX000000";
  request.requestType = dictionaryName + '.GetFiles';
  request.acceptType = dictionaryName + '.GetFilesResult';
  request.url = url;

  var response = postRequest(request);

  return;
}

function getFileInfo() {

  /* Clear the result fields. */
  setMessage(false, 'None');
  document.getElementById('request').innerHTML = 'None';
  document.getElementById('response').innerHTML = 'None';

  /* Get the url. */
  var url = getUrl();
  if (typeof url == 'undefined') {
    return;
  }

  /* Send the request. */
  var request = {};
  request.data = {};
  request.data.requestCode = 4;
  request.data.volume = "$OSS";
  request.data.subvol = "ZX000000";
  request.data.filename = "PXLOG";
  request.requestType = dictionaryName + '.GetFileInfo';
  request.acceptType = dictionaryName + '.GetFileInfoResult';
  request.url = url;

  var response = postRequest(request);

  return;
}

function getSubvols() {

  /* Clear the result fields. */
  setMessage(false, 'None');
  document.getElementById('request').innerHTML = 'None';
  document.getElementById('response').innerHTML = 'None';

  /* Get the url. */
  var url = getUrl();
  if (typeof url == 'undefined') {
    return;
  }

  /* Send the request. */
  var request = {};
  request.data = {};
  request.data.requestCode = 2;
  request.data.volume = "$OSS";
  request.requestType = dictionaryName + '.GetSubvols';
  request.acceptType = dictionaryName + '.GetSubvolsResult';
  request.url = url;

  var response = postRequest(request);

  return;
}

function getVolumes() {

  /* Clear the result fields. */
  setMessage(false, 'None');
  document.getElementById('request').innerHTML = 'None';
  document.getElementById('response').innerHTML = 'None';

  /* Get the url. */
  var url = getUrl();
  if (typeof url == 'undefined') {
    return;
  }

  /* Send the request. */
  var request = {};
  request.data = {};
  request.data.requestCode = 1;
  request.requestType = dictionaryName + '.GetVolumes';
  request.acceptType = dictionaryName + '.GetVolumesResult';
  request.url = url;

  var response = postRequest(request);

  return;
}

function postRequest(request) {

  /* Fill the request display area. */
  var content = JSON.stringify(request.data);
  var r = 'POST ' + url + '\r';
  r += 'Content-Type: application/json\r';
  r += 'Content-Length: ' + content.length + '\r';
  r += 'lw-request-type: ' + request.requestType + '\r';
  r += 'lw-accept-type: ' + request.acceptType + '\r\r';
  r += JSON.stringify(request.data, null, 2);
  document.getElementById('request').innerHTML = r;

  /* Submit the request using the XMLHttpRequest object. */
  try {
    var http = new XMLHttpRequest();
    http.open('POST', url, false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('lw-request-type', request.requestType);
    http.setRequestHeader('lw-accept-type', request.acceptType);
    http.send(content);
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