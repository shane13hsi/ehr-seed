'use strict';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    files: [
      'test/helpers/**/*.js',
      'test/components/**/*.js'
    ],
    preprocessors: {
      'test/components/**/*.js': ['webpack']
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
          loader: 'jsx?harmony&insertPragma=React.DOM'
        }]
      }
    },
    webpackServer: {
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    captureTimeout: 60000,
    singleRun: true
  });
};
