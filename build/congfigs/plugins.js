const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new HTMLWebpackPlugin({
        template: 'build/tpl/index.html'
    }),
]