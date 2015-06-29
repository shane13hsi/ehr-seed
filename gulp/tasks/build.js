var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var webpack = require('webpack');
var generateWebpackConfig = require('../../build/webpack-config-generator');
var constants = require('../../build/constants');
var path = require('path');

gulp.task('build', ['build:process-html', 'build:webpack']);

gulp.task('build:webpack', ['clean'], function(done) {
    var conf = generateWebpackConfig('production');
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

gulp.task('build:process-html', ['clean'], function() {
    return gulp.src([path.join(constants.SRC_DIR, 'index.html')])
        .pipe(replace(
            '<!-- inject:css -->',
            '<link href="' + constants.CSS_PATH + '" rel="stylesheet" type="text/css">'
        ))
        .pipe(gulp.dest(constants.DIST_DIR));
});
