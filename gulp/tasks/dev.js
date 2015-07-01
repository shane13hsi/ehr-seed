var bg = require('gulp-bg');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var constants = require('../../constants');

gulp.task('dev', ['server'], bg('node', 'server'));

gulp.task('server', function() {
    var conf = require('../../webpack/webpack-dev.config');
    var devServer = require('../../webpack/devServer');
    new WebpackDevServer(webpack(conf), devServer)
        .listen(constants.WEBPACK_DEV_SERVER_PORT, 'localhost', function(err) {
            if (err) {
                throw new gutil.PluginError('dev', err);
            }
            gutil.log('[webpack-dev-server]', 'localhost:' + constants.WEBPACK_DEV_SERVER_PORT + '/build/app.js');
        });
});
