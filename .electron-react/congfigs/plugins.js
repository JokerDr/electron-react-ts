const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';


module.exports = [
    new HTMLWebpackPlugin({
        template: 'build/tpl/index.html',
        minify:{
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
        }
    }),
    new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
]