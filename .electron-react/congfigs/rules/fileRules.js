const  {pathResolve} = require('../../utils');

module.exports = [
    {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        include: pathResolve('../../src/')
    }
]
