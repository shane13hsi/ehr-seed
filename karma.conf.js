'use strict';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/helpers/**/*.js',
      'test/index.js'
    ],
    preprocessors: {
      'test/index.js': ['webpack']
    },
    webpack: {
      cache: true,
      resolve: {
          extensions: ['', '.js', '.jsx'],
          root: __dirname + '/src/'
      },
      module: {
        loaders: [{
          test: /\.jsx$/,
          loader: 'jsx?harmony'
        }]
      }
    },
    webpackServer: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 9999,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    captureTimeout: 10000,
    singleRun: true
  });
};
