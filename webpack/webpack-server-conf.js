/*eslint-env node*/
var constants = require('../constants');
module.exports = {
    publicPath: '/' + constants.SCRIPT_DIR,
    contentBase: constants.SRC_DIR,
    noInfo: true,
    hot: true,
    stats: {
        colors: true
    }
};
