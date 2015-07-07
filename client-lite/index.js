/* Get this browser's XMLHttpRequest */
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

var dictionaryName = 'com.nuwavetech.nonstopexplorer';

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

  /* Build the request. */
  var request = {};
  request.correlationId = Date.now().toString();
  request.data = {};
  request.data.type = dictionaryName + '.GetSystemInfo';
  request.data.accept = dictionaryName + '.GetSystemInfoResult';
  request.data.value = {};
  request.data.value.requestCode = 5;

  var response = postRequest(request, url);

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

  /* Build the request. */
  var request = {};
  request.correlationId = Date.now().toString();
  request.data = {};
  request.data.type = dictionaryName + '.GetCpuList';
  request.data.accept = dictionaryName + '.GetCpuListResult';
  request.data.value = {};
  request.data.value.requestCode = 6;

  var response = postRequest(request, url);

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

  /* Build the request. */
  var request = {};
  request.correlationId = Date.now().toString();
  request.data = {};
  request.data.type = dictionaryName + '.GetFiles';
  request.data.accept = dictionaryName + '.GetFilesResult';
  request.data.value = {};
  request.data.value.requestCode = 3;
  request.data.value.volume = "$DEMO";
  request.data.value.subvol = "LWSERVER";

  var response = postRequest(request, url);

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

  /* Build the request. */
  var request = {};
  request.correlationId = Date.now().toString();
  request.data = {};
  request.data.type = dictionaryName + '.GetFileInfo';
  request.data.accept = dictionaryName + '.GetFileInfoResult';
  request.data.value = {};
  request.data.value.requestCode = 4;
  request.data.value.volume = "$DEMO";
  request.data.value.subvol = "LWSERVER";
  request.data.value.filename = "SERVER";

  var response = postRequest(request, url);

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

  /* Build the request. */
  var request = {};
  request.correlationId = Date.now().toString();
  request.data = {};
  request.data.type = dictionaryName + '.GetSubvols';
  request.data.accept = dictionaryName + '.GetSubvolsResult';
  request.data.value = {};
  request.data.value.requestCode = 2;
  request.data.value.volume = "$DEMO";

  var response = postRequest(request, url);

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

  /* Build the request. */
  var request = {};
  request.correlationId = Date.now().toString();
  request.data = {};
  request.data.type = dictionaryName + '.GetVolumes';
  request.data.accept = dictionaryName + '.GetVolumesResult';
  request.data.value = {};
  request.data.value.requestCode = 1;

  var response = postRequest(request, url);

  return;
}

function postRequest(request, url) {

  /* Fill the request display area. */
  var content = JSON.stringify(request);
  var r = 'POST ' + url + '\r';
  r += 'Content-Type: application/json\r';
  r += 'Content-Length: ' + content.length + '\r\r';
  r += JSON.stringify(request, null, 2);
  document.getElementById('request').innerHTML = r;

  /* Submit the request using the XMLHttpRequest object. */
  try {
    var http = new XMLHttpRequest();
    http.open('POST', url, false);
    http.setRequestHeader('Content-Type', 'application/json');
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