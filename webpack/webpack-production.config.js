var makeConfig = require('./makeConfig');
var constants = require('../constants');
var path = require('path');
var webpack = require('webpack');

module.exports = makeConfig({
    env: 'production',
    cache: false,
    debug: false,
    devtool: false,
    entry: {
        app: [
            path.join(constants.SRC_DIR, 'main')
        ]
    },
    output: {
        path: path.join(constants.DIST_DIR, 'js'),
        filename: '[name].js'
    },
    module: {
        preLoaders: [
            {test: /\.(jsx|js)$/, loaders: ['eslint'], exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.(js|jsx)$/, loaders: ['babel'], exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // Because uglify reports so many irrelevant warnings.
                warnings: false
            }
        })
    ]
});
