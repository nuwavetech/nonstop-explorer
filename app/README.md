NonStop Explorer App
---

The NonStop Explorer web/Android app may be built on your system using the following procedure:

#### Build the Web Version of the App

##### Install System Dependencies

* Install node.js. (http://nodejs.org/)
* Install gulp using the command:

        $ npm install -g gulp

##### Install Project Dependencies

* In the nonstop-explorer/app directory, install npm and bower dependencies using the following commands:

        $ npm install
        $ bower install

##### Build and/or Serve the Web App

* To build the app into the 'www' directory:

        $ gulp build

* To serve the app for testing with a browser. You can access that app at http://localhost:8000:

        $ gulp server


#### Build the Apache Cordova version of the App

_Note that you must build the web version in order to build the Cordova version._

##### Install Cordova Dependencies and Cordova

* Install the [JAVA JDK](http://java.oracle.com). Make sure the JAVA_HOME environment variable is set to the directory
containing the JDK and the \<JDK\>/bin directory is added to the
PATH environment variable.

* Install the Android SDK Stand-Alone Tools according to the the installation instructions found at
[Installing the Android SDK](https://developer.android.com/sdk/installing/index.html). Note that you
do not need to install Android Studio, only the Stand-Alone SDK Tools are required.
Make sure the \<SDK\>/platform-tools and \<SDK\>/tools directories are added to the PATH environment variable.

* Restart your shell or command processor so that the environment changes made by the previous dependencies will take
effect.

* Install Apache Cordova using this command. This app requires Cordova version 5.1.1 or greater:

        $ npm install -g cordova

##### Setup the Android Platform

* Add the Android platform to the project. This will also install any required Cordova plugins:

        $ cordova platform add android

##### Build and run the App

* Build the web version of the app to generate the 'www' directory used by Cordova:

        $ gulp build

* Build and run the Android app. Note that if you are installing/running on a device and get
the error INSTALL_PARSE_FAILED_INCONSISTENT_CERTIFICATES, you already have the Google Play
version of the app installed and it must be uninstalled to run the development version.

        $ cordova run

