/* Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com) */
(function() {
  'use strict';

  /* This loads the icon cache and allows md-icon to reference them by name instead of url. */
  angular.module('app').config(["$mdIconProvider", function($mdIconProvider) {
    $mdIconProvider
    .icon('assessment', 'img/ic_assessment_24px.svg', 24)
    .icon('chevron_left', 'img/ic_chevron_left_24px.svg', 24)
    .icon('chevron_right', 'img/ic_chevron_right_24px.svg', 24)
    .icon('home', 'img/ic_home_24px.svg', 24)
    .icon('info_outline', 'img/ic_info_outline_24px.svg', 24)
    .icon('menu', 'img/ic_menu_24px.svg', 24)
    .icon('settings', 'img/ic_settings_24px.svg', 24)
    .icon('storage', 'img/ic_storage_24px.svg', 24)
    ;
  }]);
})();