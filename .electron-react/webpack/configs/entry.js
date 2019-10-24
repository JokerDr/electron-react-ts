const {pathResolve} = require('../../utils')


const main = {
  main: [pathResolve('../../src/main/index.ts')]
}

const renderer = {
  renderer: [pathResolve('../../src/renderers/pages/a')],
}

const web = {
  web: [pathResolve('../../src/renderers/pages/a')],
}

module.exports = {
  main,
  renderer,
  web
}
