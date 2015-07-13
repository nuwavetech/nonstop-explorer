/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  angular.module('app').controller('LayoutController', LayoutController);

  LayoutController.$inject = ['$scope', '$mdSidenav', 'layout', 'cordova'];

  function LayoutController($scope, $mdSidenav, layout, cordova) {
    var vm = this;
    vm.closeSidenav = closeSidenav;
    vm.openSidenav = openSidenav;

    activate();

    function activate() {
      /* Get the current layout and setup a listener for layout changes. */
      vm.layout = layout.getLayout();
      $scope.$on(layout.getLayoutChangeEvent(), function() {
        vm.layout = layout.getLayout()
      });

      /* If a cordova app then set the statusbar color. */
      if (cordova.isCordovaApp()) {
        $scope.$on('cordova-deviceready', function() {
          StatusBar.backgroundColorByHexString('#1A237E'); /* material design indigo 900 */
        });
      }
    }

    function closeSidenav() {
      $mdSidenav('layout-sidenav').close();
    }

    function openSidenav() {
      $mdSidenav('layout-sidenav').open();
    }
  }

})();