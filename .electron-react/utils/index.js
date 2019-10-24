/** @format */

const path = require('path');
const { devGreeting, buildGreeting } = require('./greeting');
const { logStats } = require('./logStats');
const { electronLog } = require('./electronLog');
const { copyPackageJSON } = require('./createPackage');

// utils同级目录
const pathResolve = () => {
    const dirname = __dirname;
    return str => path.resolve(dirname, str);
};

const cacheDirectory = path.resolve(__dirname, '../../', 'cacheDirectory');
const distDirectory = path.resolve(__dirname, '../../', 'dist');
module.exports = {
    pathResolve: pathResolve(),
    cacheDirectory,
    distDirectory,
    devGreeting,
    buildGreeting,
    logStats,
    electronLog,
    copyPackageJSON,
};
