/*eslint-env node*/
var path = require('path');
var constants = require('./constants');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (environment) {
    environment = environment || 'production';

    var jsx = {
        test: /\.jsx$/,
        exclude: constants.NODE_MODULES_DIR,
        loaders: ['babel']
    };

    var conf = {
        output: {
            path: path.join(constants.ABSOLUTE_BASE, constants.DIST_DIR, constants.SCRIPT_DIR),
            filename: constants.ENTRY_NAME + '.js'
        },

        context: path.join(constants.ABSOLUTE_BASE, constants.SRC_DIR),

        entry: [
            path.join(constants.SCRIPT_DIR, constants.ENTRY_NAME)
        ],

        cache: true,
        debug: false,
        devtool: false,

        stats: {
            colors: true,
            reasons: true
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    // This has effect on the react lib size
                    'NODE_ENV': JSON.stringify(environment)
                }
            })
        ],

        resolve: {
            // Allow to omit extensions when requiring these files
            extensions: ['', '.js', '.jsx'],
            root: path.join(constants.ABSOLUTE_BASE, constants.SRC_DIR)
        },

        module: {
            loaders: [jsx, {
                test: /\.js$/,
                exclude: constants.NODE_MODULES_DIR,
                loaders: ['babel']
            }, {
                test: /\.(png|jpg|gif)$/,
                loaders: ['file?name=' + constants.CSS_RELATIVE_BASE + '[path][name].[ext]']
            }]
        }
    };

    if (environment === 'test' || environment === 'server') {
        conf.debug = true;
        conf.devtool = 'eval';
        conf.module.loaders.push({
            test: /\.(css|less)$/,
            loaders: ['style', 'css', 'less']
        });
    }

    if (environment === 'server') {
        conf.output.publicPath = '/' + constants.SCRIPT_DIR;
        conf.entry.push('webpack/hot/dev-server');
        conf.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        );
        jsx.loaders.unshift('react-hot');
    }

    if (environment === 'production') {
        conf.plugins.push(
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new ExtractTextPlugin(
                constants.CSS_RELATIVE_BASE + constants.CSS_PATH, {
                    allChunks: true
                }
            )
        );
        conf.preLoaders = [{
            test: /\.(jsx|js)$/,
            exclude: constants.NODE_MODULES_DIR,
            loaders: ['eslint']
        }];
        conf.module.loaders.push({
            test: /\.(css|less)$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        });
    }

    return conf;
};
