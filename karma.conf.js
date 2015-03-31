/*eslint-env node*/
var webpackConfig = require('./build/webpack-config-generator')('test');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'test/index.js'
        ],
        preprocessors: {
            'test/index.js': ['webpack']
        },
        webpack: webpackConfig,
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
