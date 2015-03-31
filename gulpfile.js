/*eslint-env node*/
var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var generateWebpackConfig = require('./build/webpack-config-generator');
var karma = require('karma').server;
var del = require('del');
var path = require('path');

gulp.task('default', ['build']);

gulp.task('clean', function (done) {
    del(['dist/'], done);
});

gulp.task('test', function (done) {
    karma.start({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: true,
        autoWatch: false
    }, done);
});

gulp.task('tdd', function (done) {
    karma.start({ configFile: path.join(__dirname, 'karma.conf.js') }, done);
});

gulp.task('build', ['test', 'build:process-html', 'build:copy-assets', 'build:webpack']);

gulp.task('build:webpack', function (done) {
    var conf = generateWebpackConfig('production');
    webpack(conf, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('build', err);
        }
        if (stats.hasWarnings()) {
            gutil.log(stats.toString({
                colors: true,
                timings: false,
                assets: false,
                hash: false,
                chunks: false
            }).replace(/Version.*?\n/, 'Webpack Problems:'));
        }
        done();
    });
});

gulp.task('build:copy-assets', function () {
    return gulp.src(['src/assets/**'])
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('build:process-html', function () {
    return gulp.src(['src/index.html'])
        .pipe(replace(
            '<!-- inject:css -->',
            '<link href="styles/main.css" rel="stylesheet" type="text/css">'
        ))
        .pipe(gulp.dest('dist/'));
});

gulp.task('server', function () {
    var conf = generateWebpackConfig('server');
    var serverConf = require('./build/webpack-server-conf');
    var startCallback = function (err) {
        if (err) {
            throw new gutil.PluginError('server', err);
        }
        gutil.log('Webpack Dev Server Started:');
        gutil.log('http://localhost:8080/webpack-dev-server/');
    };
    var server = new WebpackDevServer(webpack(conf), serverConf);
    server.listen(8080, 'localhost', startCallback);
});
