const path = require('path');
const { spawn } = require('child_process');
const electron = require('electron');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackHotMiddleware = require('webpack-hot-middleware')
const mainConfig = require('./webpack/webpack.config.main');
const rendererConfig = require('./webpack/webpack.config.renderer');
const {devGreeting, logStats, electronLog}  = require('./utils');


process.env.NODE_ENV = 'development'

let electronProcess = null;
let manualRestart = false;
let hotMiddleWare;
/**
 * renderer Process start
 */
const rendererStart = () => new Promise((resolve, reject) => {
  // 添加编译载入界面
  rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry.renderer);
  rendererConfig.mode = 'development';
  const compiler = webpack(rendererConfig)
  hotMiddleWare = webpackHotMiddleware(compiler, {
    log: false,
    heartbeat: 2500
  });

  compiler.hooks.compilation.tap('compilation', compilation => {
    compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('html-webpack-plugin-after-emit', (data, cb) => {
      hotMiddleWare.publish({ action: 'reload' })
      cb()
    })
  })

  // 完成阶段
  compiler.hooks.done.tap('done', stats => {
    logStats('Renderer', stats)
  });

  const server = new webpackDevServer(
    compiler,
    {
      contentBase: path.join(__dirname, '../'),
      quiet: true,
      before (app, ctx) {
        app.use(hotMiddleWare)
        ctx.middleware.waitUntilValid(() => {
          resolve();
        })
      }
    }
  );
  server.listen(9080);
})

/**
 * electron start
 */
const electronStart = () => {
  var args = [
    '--inspect=5858',
    path.join(__dirname, '../', 'dist/electron/main.js'),
    // path.join(__dirname, '../dist/electron/main.js')
  ]
  // detect yarn or npm and process commandline args accordingly
  if (process.env.npm_execpath.endsWith('yarn.js')) {
    args = args.concat(process.argv.slice(3))
  } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
    args = args.concat(process.argv.slice(2))
  }
  electronProcess = spawn(electron, args)

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}


/**
 * main process start
 */
const mainStart = () => new Promise((resolve, reject) => {
  // mainConfig.entry.main = [path.join(__dirname, '../src/main/index.ts')].concat(mainConfig.entry.main)
  mainConfig.mode = 'development'
  const compiler = webpack(mainConfig)

  compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
    logStats('Main', chalk.white.bold('compiling...'))
    hotMiddleWare.publish({ action: 'compiling' })
    done()
  })

  compiler.watch({}, (err, stats) => {
    if (err) {
      console.log(err)
      return
    }

    logStats('Main', stats)

    if (electronProcess && electronProcess.kill) {
      manualRestart = true
      process.kill(electronProcess.pid)
      electronProcess = null
      electronStart()

      setTimeout(() => {
        manualRestart = false
      }, 5000)
    }

    resolve()
  })
})



const init = () => {
  devGreeting()
  Promise.all([rendererStart(), mainStart()]).then(() => {
    electronStart();
  }).catch(err => {
    console.error(err);
  });
}

init();
