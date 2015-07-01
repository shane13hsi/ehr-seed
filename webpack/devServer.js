/*eslint-env node*/
var constants = require('../constants');
module.exports = {
    contentBase: 'http://localhost:' + constants.WEBPACK_DEV_SERVER_PORT,
    publicPath: 'http://localhost:' + constants.WEBPACK_DEV_SERVER_PORT + '/build',
    hot: true,
    noInfo: true,
    stats: {
        colors: true
    }
};
