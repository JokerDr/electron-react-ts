

const entry = require('./congfigs/entry');
const output = require('./congfigs/output');
const resolve = require('./congfigs/resolve');
const optimization = require('./congfigs/optimization');
const _module = require('./congfigs/_module');
const plugins = require('./congfigs/plugins');

// import _module from './congfigs/_module'

const target = process.env.BUILD_ENV = 'main';


module.exports = {
  target: 'electron-main',
  entry: entry[target],
  output: output[target],
  module: _module(target),
  plugins: plugins[target],
  resolve,
  optimization,
}
