/** @format */

const path = require('path');

const forgePlatform = {
    darwin: 'darwin',
    linux: 'linux',
    mas: 'mas',
    win32: 'win32',
    all: 'all',
};

module.exports = {
    packagerConfig: {
        dir: path.resolve(__dirname, '../../dist/electron/'),
        arch: 'x64',
        platform: forgePlatform[process.env.BUILD_TARGET],
        asar: false,
        overwrite: true,
        out: path.resolve(__dirname, '../../dist/electron-packaged/')
    },
    electronRebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-deb',
            platforms: ['linux'],
            config: {
                // Config here
            },
        },
    ],
    publishers: [],
    plugins: [],
    hooks: {},
    // buildIdentifier: 'my-build'
};
