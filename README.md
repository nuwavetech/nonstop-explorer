NonStop Explorer
---

The NonStop Explorer sample application demonstrates how a web application or mobile device can exchange
messages with an HP NonStop Server Pathway application using NuWave Technologies LightWave
Server<sup>&trade;</sup>. The client app communicates with a NonStop Pathway server using LightWave
Server's Serverclass REST API.

The client app was developed using [AngularJS](https://angularjs.org/) and can be built into a native mobile application
using [Apache Cordova](https://cordova.apache.org/).

The server was developed in C, runs under Pathway, and uses Guardian system procedure calls to
gather system information. The server uses standard request/response interprocess messages (IPMs)
defined by DDL. LightWave Server<sup>&trade;</sup> acts as the gateway between the client
app and the Pathway server.

The sample consists of three separate components:

* The [Pathway Server](server).
* The [client app](app). This version was created using AngularJS and Apache Cordova and may be deployed as a web
or Android application.
* A [lightweight version](lite) of the client app. This is a simple HTML/Javascript version
of the app for those unfamiliar with AngularJS.
  
Live web versions of the client apps, hosted on Amazon Cloudfront, can be found here:

* [nonstop-explorer.demo.nuwavetech.com](https://nonstop-explorer.demo.nuwavetech.com)
* [nonstop-explorer-lite.demo.nuwavetech.com](https://nonstop-explorer-lite.demo.nuwavetech.com)

The Android version of the app can be found at the [Google Play Store](https://play.google.com/store/apps/details?id=com.nuwavetech.nonstopexplorer).

Documentation for LightWave Server can be found at the [NuWave Technologies Documentation Center](https://docs.nuwavetech.com)
<hr>

[LightWave Server](https://www.nuwavetech.com/lightwave-server) is a trademark of NuWave Technologies, Inc.<br>
HP NonStop is a registered trademark of Hewlett-Packard.<br>
All source code in this project is [licensed under the MIT License](LICENSE.md).