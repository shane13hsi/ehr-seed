var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var webpack = require('webpack');
var constants = require('../../constants');
var path = require('path');

gulp.task('product', ['product:webpack']);

gulp.task('product:webpack', ['clean'], function(done) {
    var conf = require('../../webpack/webpack-production.config');
    webpack(conf, function(err, stats) {
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
