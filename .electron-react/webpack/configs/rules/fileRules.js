const  {pathResolve} = require('../../../utils');

const main = [
]

const renderer = [
  {
      test: /\.svg$/,
      loader: '@svgr/webpack',
      include: pathResolve('../../src/')
  }
]

const web = [
  {
      test: /\.svg$/,
      loader: '@svgr/webpack',
      include: pathResolve('../../src/')
  }
]

const targets = {
  main,
  renderer,
  web
}

module.exports = (target) => targets[target];
