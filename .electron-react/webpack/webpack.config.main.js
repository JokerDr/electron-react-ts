

const entry = require('./configs/entry');
const output = require('./configs/output');
const _module = require('./configs/_module');
const plugins = require('./configs/plugins');
const baseWebapckConfig = require('./webpack.config.base');
const webapckMerge = require('webpack-merge');
// import _module from './congfigs/_module'

const target = process.env.BUILD_ENV = 'main';


module.exports = webapckMerge(baseWebapckConfig, {
  target: 'electron-main',
  entry: entry[target],
  output: output[target],
  module: _module(target),
  plugins: plugins[target],
})
