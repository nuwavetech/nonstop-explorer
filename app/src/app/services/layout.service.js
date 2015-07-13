/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {

  'use strict';

  /* Configure the default route. */
  angular.module('app').config(config);
  config.$inject = [ '$urlRouterProvider' ];
  function config($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('info');
  }

  /* The layout service. */
  angular.module('app').factory('layout', layout);
  layout.$inject = ['$rootScope', '$state', 'cordova' ];

  function layout($rootScope, $state, cordova) {

    var methods = {
      getLayout : getLayout,
      getLayoutChangeEvent : getLayoutChangeEvent,
      getVersion : getVersion,
      setToolbarTitle : setToolbarTitle,
      returnFromErrorView : returnFromErrorView,
      showDefaultView : showDefaultView,
      showErrorView : showErrorView,
      showProgress : showProgress,
    };

    var layout = {};
    var layoutChangeEvent = 'layout.layoutChange';
    var currentState = null;
    var errorReturnState = null;

    return activate();

    function activate() {
      /* Initialize the layout. */
      layout = {};
      layout.sidenavItems = [];
      layout.toolbarTitle = '';
      layout.showProgress = false;

      /* Setup the sidenav menu. */
      addSidenavItem('System Info', 'home', 'info');
      addSidenavItem('Storage', 'storage', 'storage');
      addSidenavItem('CPU Status', 'assessment', 'cpu');
      addSidenavItem('Settings', 'settings', 'settings');
      addSidenavItem('About', 'info_outline', 'about');

      /* Setup listeners. */
      $rootScope.$on('$stateChangeStart', onStateChangeStart);
      $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
      $rootScope.$on('$stateNotFound', onStateNotFound);

      if (cordova.isCordovaApp()) {
        $rootScope.$on('cordova-volumeupbutton', onVolumeUp);
        $rootScope.$on('cordova-volumedownbutton', onVolumeDown);
      }

      /* Go to the default view. */
      showDefaultView();

      /* Return the methods object. */
      return methods;
    }

    function addSidenavItem(title, icon, stateName) {
      var item = layout.sidenavItems[layout.sidenavItems.length] = {};
      item.title = title;
      item.icon = icon;
      item.stateName = stateName;
    }

    function broadcastLayoutChange() {
      $rootScope.$broadcast(layoutChangeEvent, layout);
    }

    function getLayout() {
      return layout;
    }

    function getLayoutChangeEvent() {
      return layoutChangeEvent;
    }

    function getVersion() {
      return '2.0.0';
    }

    function onStateChangeStart(event, next, current) {
    }

    function onStateChangeSuccess(event, next, current) {
//      layout.toolbarTitle = (typeof next.title !== 'undefined' ? next.title : '');
      layout.toolbarTitle = '';
      currentState = next;
      for (var i = 0; i < layout.sidenavItems.length; i++) {
        if (layout.sidenavItems[i].stateName === next.name) {
          layout.sidenavItem = i;
          break;
        }
      }
      broadcastLayoutChange();
    }

    function onStateNotFound(event, next, current) {
      $state.go[layout.sidenavItems[0].state];
    }

    function onVolumeUp() {
      if (layout.sidenavItem > 0) {
        $state.go(layout.sidenavItems[layout.sidenavItem - 1].stateName);
      }
    }

    function onVolumeDown() {
      if (layout.sidenavItem < layout.sidenavItems.length - 1) {
        $state.go(layout.sidenavItems[layout.sidenavItem + 1].stateName);
      }
    }

    function returnFromErrorView() {
      if (errorReturnState !== null) {
        var state = errorReturnState;
        errorReturnState = null;
        $state.go(state.name);
      }
    }

    function setToolbarTitle(title) {
      layout.toolbarTitle = title;
      broadcastLayoutChange();
    }

    function showErrorView(message) {
      errorReturnState = currentState;
      $state.go('error');
    }

    function showProgress(bool) {
      layout.showProgress = bool;
      broadcastLayoutChange();
    }

    function showDefaultView() {
      $state.go('info');
    }

  }

})();
