const {pathResolve} = require('../../utils')
module.exports = {
    contentBase: pathResolve('../../src'),
    compress: true,
    port: 9000,
    hot: true,
}
