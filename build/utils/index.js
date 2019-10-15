const path  = require('path');

// utils同级目录
const pathResolve = () => {
    const dirname = __dirname;
    return (str)  => path.resolve(dirname, str);
}

const cacheDirectory = path.resolve(__dirname, '../../', 'cacheDirectory');

module.exports = {
    pathResolve: pathResolve(),
    cacheDirectory,
}