var makeConfig = require('./makeConfig');
var constants = require('../constants');
var path = require('path');

module.exports = makeConfig({
    entry: {
        app: [
            path.join(constants.SRC_DIR, 'main')
        ]
    },
    output: {
        path: path.join(constants.BUILD_DIR, 'js'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, loaders: ['babel'], exclude: /node_modules/}
        ]
    }
});
