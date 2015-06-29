/*eslint-env node*/
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'test/index.js'
        ],
        preprocessors: {
            'test/index.js': ['webpack']
        },
        webpack: require('./webpack/webpack-config-generator')('test'),
        webpackServer: require('./webpack/webpack-server-conf'),
        exclude: [],
        port: 9999,
        logLevel: config.LOG_WARN,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome'],
        reporters: ['progress'],
        captureTimeout: 10000,
        singleRun: false
    });
};
