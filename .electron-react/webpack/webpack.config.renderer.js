// module.exports = {
//     mode: 'production',
// }
const entry = require('./configs/entry');
const output = require('./configs/output');
const _module = require('./configs/_module');
const plugins = require('./configs/plugins');
const baseWebapckConfig = require('./webpack.config.base');
const webapckMerge = require('webpack-merge');

const target = process.env.BUILD_ENV = 'renderer';

module.exports = webapckMerge(baseWebapckConfig, {
  devtool: '#cheap-module-eval-source-map',
  target: 'electron-renderer',
  entry: entry[target],
  output: output[target],
  module: _module(target),
  plugins: plugins[target],
})
