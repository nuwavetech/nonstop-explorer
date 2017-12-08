/*
    Copyright (c) 2016 NuWave Technologies, Inc. All Rights Reserved.

    MIT License

    Permission is hereby granted, free of charge, to any person obtaining a copy of this
    software and associated documentation files (the "Software"), to deal in the Software
    without restriction, including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
    to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or
    substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
    FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
*/

'use strict';

const Alexa = require('alexa-sdk');
const https = require('http');
const config = require('./config.js');
const $q = require('q');


exports.handler = function(event, context, callback ) {

  var alexa = Alexa.handler( event, context );

  console.log( 'event=' + JSON.stringify( event ) );
  console.log( 'context=' + JSON.stringify( context ) );

  alexa.appId = config.AlexaAppId;
  alexa.registerHandlers( handlers );
  alexa.execute();

};


var handlers = {

  "LaunchRequest": function() {
    var speechOutput = "Welcome to the lightwave system explorer for nonstop. You can ask for CPU status";
    var repromptText = "You can say, get CPU status";
    this.emit( ':ask', speechOutput, repromptText );
  },


  "GetCpuStatus": function() {

    var $this = this;

    GetCpuStatus().then( function( data ) {

      console.log( "cpustatus=" + JSON.stringify( data ) );
      var cpulist = data.cpuList;
      var speech = 'There are ' + cpulist.cpuCount + ' processors' +
        ' on node <say-as interpret-as="spell-out">' + data.node.substring(1) + '</say-as>.';

      var cardtext = '';
      for ( var x = 0; x < cpulist.cpuCount; x++ ) {
        speech += 'CPU ' + cpulist.cpu[x].cpuNumber + ' is ' + cpulist.cpu[x].busy + '% busy. ';
        cardtext += 'CPU ' + cpulist.cpu[x].cpuNumber + ': ' + cpulist.cpu[x].busy + '%\n';
      }

      $this.emit( ':tellWithCard', speech, "CPU Status", cardtext );

    }, function( exception ) {
      console.log( exception.toString() );
      $this.emit( ':tellWithCard', "An error occurred", "Exception", exception.message );

    }).catch( function( exception ) {
      console.log( exception.toString() );
      $this.emit( ':tellWithCard', "An error occurred", "Exception", exception.message );
    });

  },

  "SessionEndedRequest": function() {
    console.log( "session ended" );
  },

  "Unhandled": function() {
    console.log( "Unhandled request" );
    this.emit( ':tell', 'I didn\'t understand. Please try again.' );
  },

  "AMAZON.HelpIntent": function() {
    this.emit( ':ask', "You can say, get CPU status" );
  }

};   //  handlers


function GetCpuStatus() {

  var d = $q.defer();

  var options = {
    host: config.host,
    path: '/explore/v1/cpu',
    method: 'GET'
  };

  console.log( "http request options=" + JSON.stringify( options ) );

  var request = https.request( options, function( response ) {

    console.log( 'status=' + response.statusCode );
    console.log( 'headers=' + JSON.stringify( response.headers ) );

    response.setEncoding('utf8');

    var data = '';

    response.on( 'data', function( chunk ) {
      console.log( 'chunk=' + chunk );
      data += chunk;
    });

    response.on( 'end', function( chunk ) {
      d.resolve( JSON.parse( data ) );
    });

  });   //  request

  request.on( 'error', function( e ) {
    console.log( 'https request error=' + e.message );
    d.reject( e );
  });

  request.end();

  return d.promise;

}   //  function