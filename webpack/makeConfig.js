var path = require('path');
var constants = require('../constants');
var webpack = require('webpack');

/**
 * @param options 默认的 config 都在这里配置好，且默认为 development 的配置，其余的配置会强制，包括：
 *        entry   无 default
 *        output  无 defalut
 *
 *        module  有 default，请补全特定 env 的 module（主要是 loaders）
 *        plugin  有 default，请补全特定 env 的 plugins
 * */
module.exports = function(options) {
    var conf = {

        entry: options.entry,
        output: options.output,

        cache: options.cache === undefined ? true : options.cache,   // 开发环境为 true，提升增量编译的性能
        debug: options.debug === undefined ? true : options.debug,    // loaders 可能会使用到 debug mode
        devtool: options.devtool === undefined ? 'eval' : options.devtool,  // 增强 debug,

        resolve: {
            extensions: ['', '.js', '.jsx', '.json'],
            root: constants.SRC_DIR, // 包含代码（modules）的目录，使用绝对路径
            alias: {
                'react$': require.resolve(path.join(constants.NODE_MODULES_DIR, 'react')) // 强制 import 'react' 为同版本
            }
        },

        module: (function() {
            var loaders = [
                {test: /\.less$/, loader: 'style!css!less'},
                {test: /\.(scss|sass)$/, loader: 'style!css!sass'},
                {test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000'}
            ];
            if (options.module.loaders) {
                options.module.loaders = loaders.concat(options.module.loaders);
            }
            return options.module;
        })(),

        plugins: (function() {
            var plugins = [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(options.env || 'development')
                    }
                })
            ];
            if (options.plugins) {
                plugins = plugins.concat(options.plugins);
            }
            return plugins;
        })(),

        stats: {
            colors: true,
            reasons: true
        }
    };

    return conf;
};
