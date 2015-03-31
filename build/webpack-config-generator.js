/*eslint-env node*/

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BASE_PATH = path.normalize(path.join(__dirname, '..'));

module.exports = function (environment) {
    environment = environment || 'production';

    var jsx = {
        test: /\.jsx$/,
        exclude: path.join(BASE_PATH, 'node_modules'),
        loaders: ['babel']
    };

    var conf = {
        output: {
            path: path.join(BASE_PATH, 'dist', 'scripts'),
            publicPath: '/scripts/',
            filename: 'main.js'
        },

        entry: [
            path.join('scripts', 'main')
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
            root: path.join(BASE_PATH, 'src')
        },

        module: {
            loaders: [jsx, {
                test: /\.js$/,
                exclude: path.join(BASE_PATH, 'node_modules'),
                loaders: ['babel']
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
            new ExtractTextPlugin('../styles/main.css', {
                allChunks: true
            })
        );
        conf.preLoaders = [{
            test: /\.(jsx|js)$/,
            exclude: path.join(BASE_PATH, 'node_modules'),
            loaders: ['eslint']
        }];
        conf.module.loaders.push({
            test: /\.(css|less)$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        });
    }

    return conf;
};
