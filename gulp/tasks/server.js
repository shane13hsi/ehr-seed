var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var generateWebpackConfig = require('../../webpack/webpack-config-generator');

gulp.task('server', function() {
    var conf = generateWebpackConfig('server');
    var serverConf = require('../../webpack/webpack-server-conf');
    var startCallback = function(err) {
        if (err) {
            throw new gutil.PluginError('server', err);
        }
        gutil.log('Webpack Dev Server Started:');
        gutil.log('http://localhost:8080/webpack-dev-server/');
    };
    var server = new WebpackDevServer(webpack(conf), serverConf);
    server.listen(8080, 'localhost', startCallback);
});
