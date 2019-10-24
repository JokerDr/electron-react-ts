const {pathResolve} = require('../../utils');

const web = {
  filename: '[name].js',
  path: pathResolve('../../dist/web'),
}

const electron = {
  filename: '[name].js',
  path: pathResolve('../../dist/electron'),
}


module.exports = {
  web,
  main: electron,
  renderer: electron
}
