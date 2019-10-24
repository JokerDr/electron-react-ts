/** @format */

const { say } = require('cfonts');
const chalk = require('chalk');
const del = require('del');
const packager = require('electron-packager');
const webpack = require('webpack');
const Multispinner = require('multispinner');

// const rendererConfig = require('./webpack/webpack.config.renderer');
// const mainConfig = require('./webpack/webpack.config.main');
const { buildGreeting, copyPackageJSON } = require('./utils');
const buildConfig = require('./electron-build-tools');

const doneLog = chalk.bgGreen.white(' DONE ') + ' ';
const errorLog = chalk.bgRed.white(' ERROR ') + ' ';
const okayLog = chalk.bgBlue.white(' OKAY ') + ' ';

/**
 * clear all
 */
const clean = () => {
    del.sync(['build/*', '!build/icons', '!build/icons/icon.*']);
    console.log(`\n${doneLog}\n`);
    process.exit();
};

/**
 * package
 */
// const pack = config =>
//     new Promise((resolve, reject) => {
//         webpack(config, (err, stats) => {
//             if (err) {
//                 reject(err.stack || err);
//             } else if (stats.hasErrors()) {
//                 let err = '';
//                 stats
//                     .toString({
//                         chunks: false,
//                         colors: true,
//                     })
//                     .split(/\r?\n/)
//                     .forEach(line => {
//                         err += `    ${line}\n`;
//                     });

//                 reject(err);
//             } else {
//                 resolve(
//                     stats.toString({
//                         chunks: false,
//                         colors: true,
//                     }),
//                 );
//             }
//         });
//     });

/**
 *
 */
const bundleApp = () => {
    buildConfig.mode = 'production';
    packager(buildConfig).then( appPaths => {
      console.log(`\n${doneLog}\n`);
      console.timeEnd();
      console.log(...appPaths);
      process.exit();
    }).catch( err => {
      console.log(`\n${errorLog}${chalk.yellow('`electron-packager`')} says...\n`);
      console.log(err + '\n');
    });
};

/**
 *
 */
const web = () => {
    del.sync(['dist/web/*', '!.gitkeep']);
    webConfig.mode = 'production';
    webpack(webConfig, (err, stats) => {
        if (err || stats.hasErrors()) console.log(err);

        console.log(
            stats.toString({
                chunks: false,
                colors: true,
            }),
        );

        process.exit();
    });
};

/**
 *
 */
const build = () => {
    // let results = '';
    buildGreeting();
    console.time();
    // del.sync(['dist/electron/*', '!.gitkeep']);

    // const tasks = ['main', 'renderer'];
    // const m = new Multispinner(tasks, {
    //     preText: 'building',
    //     postText: 'process',
    // });
    copyPackageJSON();
    bundleApp();
    // m.on('success', () => {
    //     process.stdout.write('\x1B[2J\x1B[0f');
    //     console.log(`\n\n${results}`);
    //     console.log(`${okayLog}take it away \n`);
    //     bundleApp();
    //     console.time();
    //     // process.exit();
    // });

    // pack(mainConfig)
    //     .then(result => {
    //         results += result + '\n\n';
    //         console.log(results, 'ddd');
    //         m.success('main');
    //     })
    //     .catch(err => {
    //         m.error('main');
    //         console.log(`\n  ${errorLog}failed to build main process`);
    //         console.error(`\n${err}\n`);
    //         process.exit(1);
    //     });

    // pack(rendererConfig)
    //     .then(result => {
    //         results += result + '\n\n';
    //         m.success('renderer');
    //     })
    //     .catch(err => {
    //         m.error('renderer');
    //         console.log(`\n  ${errorLog}failed to build renderer process`);
    //         console.error(`\n${err}\n`);
    //         process.exit(1);
    //     });
};

if (process.env.BUILD_TARGET === 'clean') clean();
else if (process.env.BUILD_TARGET === 'web') web();
else build();
