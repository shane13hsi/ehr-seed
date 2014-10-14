var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var clean = require('gulp-clean');
var open = require("open");
var runSequence = require('run-sequence');

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

gulp.task("clean", function () {
    return gulp.src(['./dist/']).pipe(clean());
});

gulp.task("build", ['clean'], function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ];

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-prod", err);
        gulp.src([ '!src/scripts/**', 'src/**/*']).pipe(gulp.dest('./dist/'));
        callback();
    });
});

gulp.task("webpack-dev-server", function (callback) {
    var conf = Object.create(webpackConfig);
    conf.entry.push('webpack/hot/dev-server');

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(conf), {
        publicPath: conf.output.publicPath,
        contentBase: './src/',
        stats: {
            colors: true
        },
        debug: true,
        devtool: 'eval',
        hot: true
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        open("http://localhost:8080/webpack-dev-server/");
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/");
    });
});
