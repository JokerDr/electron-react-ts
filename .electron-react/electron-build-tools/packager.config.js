const path = require('path')

/**
 * `electron-packager` options
 * https://github.com/electron/electron-packager/blob/master/docs/api.md
 */
module.exports = {
  arch: 'x64',
  asar: false,
  dir: path.resolve(__dirname, '../../dist/electron/'),
  // icon: path.resolve(__dirname, '../../resources/icons/icon'),
  // ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
  out: path.resolve(__dirname, '../../dist/electron-packaged'),
  overwrite: true,
  platform: process.env.BUILD_TARGET || 'all'
}
