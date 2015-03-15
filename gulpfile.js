var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var del = require('del');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

gulp.task('clean', function (cb) {
    del(['./dist/'], cb);
});

gulp.task('build', ['clean'], function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin('../styles/main.css', {
            allChunks: true
        })
    ];
    myConfig.module.loaders.pop();
    myConfig.module.loaders.push({
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
    });

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:build-prod', err);
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
        gulp.src([ '!src/+(scripts|styles)/**', 'src/**/*'])
            .pipe(gulp.dest('./dist/'));
        callback();
    });
});

gulp.task('webpack-dev-server', function (/* callback */) {
    var conf = Object.create(webpackConfig);
    conf.entry.push('webpack/hot/dev-server');

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(conf), {
        publicPath: conf.output.publicPath,
        contentBase: './src/',
        noInfo: true,
        stats: {
            colors: true
        },
        debug: true,
        devtool: 'eval',
        hot: true
    }).listen(8080, 'localhost', function (err) {
        if (err) { throw new gutil.PluginError('webpack-dev-server', err); }
        gutil.log('Webpack Dev Server Started:');
        gutil.log('http://localhost:8080/webpack-dev-server/');
    });
});
