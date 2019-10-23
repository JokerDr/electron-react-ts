// module.exports = {
//     mode: 'production',
// }
const entry = require('./congfigs/entry');
const output = require('./congfigs/output');
const _module = require('./congfigs/_module');
const devServer = require('./congfigs/devServer');
const plugins = require('./congfigs/plugins');
const resolve = require('./congfigs/resolve');
const optimization = require('./congfigs/optimization');

const target = process.env.BUILD_ENV = 'renderer';

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  target: 'electron-renderer',
  entry: entry[target],
  output: output[target],
  module: _module(target),
  plugins: plugins[target],
  optimization,
  resolve,
  // devServer,

  // externals: []
}
