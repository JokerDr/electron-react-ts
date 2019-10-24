const resolve = require('./configs/resolve');
const optimization = require('./configs/optimization');

module.exports = {
  resolve,
  optimization,
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
}
