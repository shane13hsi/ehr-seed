var conf = require('./webpack-config-generator')('server');
module.exports = {
    publicPath: conf.output.publicPath,
    contentBase: 'src/',
    noInfo: true,
    hot: true,
    stats: {
        colors: true
    }
};
