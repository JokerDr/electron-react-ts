const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const {pathResolve} = require('../utils');

module.exports = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [
        new TsconfigPathsWebpackPlugin({
          // 配置文件引入tsconfig.json
          configFile: pathResolve('../../tsconfig.json')
        })
    ],
}
