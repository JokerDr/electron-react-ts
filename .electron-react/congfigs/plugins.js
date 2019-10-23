const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');


const main = [
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin({
    analyzerPort: 8889
  }),
]

const renderer = [
  new webpack.HotModuleReplacementPlugin(),
  new HTMLWebpackPlugin({
      template: '.electron-react/tpl/index.html',
      minify:{
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
      }
  }),
  new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  }),
  new BundleAnalyzerPlugin({
    analyzerPort: 8888
  }),
]

const web = [
  new HTMLWebpackPlugin({
      template: '.electron-react/tpl/index.html',
      minify:{
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
      }
  }),
  new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  }),
  new BundleAnalyzerPlugin(),
]

module.exports = {
  main,
  renderer,
  web
}
