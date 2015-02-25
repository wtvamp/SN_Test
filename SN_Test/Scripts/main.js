// config for require js
require.config({
  waitSeconds: 30,
  paths: {
    application: 'app/application',
    jquery: 'vendor/jquery-1.10.2/jquery-1.10.2',
    u: 'common/utils',
    lodash: 'vendor/lodash-2.4.1/dist/lodash',
    backbone: 'vendor/backbone-1.0.0/backbone',
    stickit: 'vendor/backbone.stickit-0.7.0/backbone.stickit',
    r: 'vendor/rooster-0.1.0',
    s: 'vendor/slickgrid-33e75b07bf',
    handlebars: 'vendor/handlebars-1.0.0/handlebars'
  },
  lodashLoader: {
    ext: '.ldsh'
  }
});

// load application.js
require([
  'application',
],
function (App) {
  'use strict';

  App.start();
});
