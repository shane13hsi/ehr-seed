/*eslint-env node*/

'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
    output: {
        path: path.join(__dirname, 'dist', 'scripts'),
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx'],
        root: path.join(__dirname, 'src')
    },

    module: {
        preLoaders: [{
            test: /\.(jsx|js)$/,
            exclude: path.join(__dirname, 'node_modules'),
            loaders: ['eslint']
        }],
        loaders: [{
            test: /\.jsx$/,
            exclude: path.join(__dirname, 'node_modules'),
            loaders: ['react-hot', 'babel']
        }, {
            test: /\.js$/,
            exclude: path.join(__dirname, 'node_modules'),
            loaders: ['babel']
        }, {
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        }]
    }
};
