/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpak-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */

'use strict';
var webpack = require('webpack');

module.exports = {
    output: {
        path: __dirname + "/dist/scripts",
        publicPath: '/scripts/',
        filename: "main.js"
    },

    entry: [
        './scripts/main.jsx'
    ],

    cache: true,
    debug: false,
    devtool: false,
    context: __dirname + '/src',

    stats: {
        colors: true,
        reasons: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['react-hot', 'jsx?harmony&insertPragma=React.DOM']
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }]
    }
};
