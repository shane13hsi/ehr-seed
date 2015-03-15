'use strict';
var webpackConfig = require('./webpack.config');
var assign = require('react/lib/Object.assign');
var loaders = webpackConfig.module.loaders.map(function (loader) {
    loader = assign({}, loader);
    if (loader.loaders) {
        loader.loaders = loader.loaders.filter(function (name) {
            return name !== 'react-hot';
        });
    }
    return loader;
});

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
            resolve: webpackConfig.resolve,
            module: {
                loaders: loaders
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
        logLevel: config.LOG_WARN,
        colors: true,
        autoWatch: true,
        browsers: ['PhantomJS'],
        reporters: ['progress'],
        captureTimeout: 10000,
        singleRun: false
    });
};
