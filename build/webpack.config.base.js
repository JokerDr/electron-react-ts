const entry = require('./congfigs/entry');
const _module = require('./congfigs/_module');
const output = require('./congfigs/output');
const plugins = require('./congfigs/plugins');
const resolve = require('./congfigs/resolve');
const devServer = require('./congfigs/devServer');
const optimization = require('./congfigs/optimization');

module.exports = {
    entry, 
    output, 
    plugins, 
    resolve,
    optimization,
    module: _module,
    devServer,
    devtool: 'cheap-module-eval-source-map',
    // target: 'electron-renderer'
}