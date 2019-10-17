const {cacheDirectory} = require('../../utils');
const {pathResolve} = require('../../utils')
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = [
    {
        test: /\.(j|t)s(x?)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        include: [pathResolve('../../src')],
        use: [
            {
                loader: 'cache-loader',
                options: {
                    cacheDirectory, 
                }
            },
            // {
            //     loader: 'babel-loader',
            //     options: {
            //         presets: ['@babel/preset-env'],
            //         plugins: [
            //             [
            //               'import',
            //               {
            //                 libraryName: 'antd',
            //                 libraryDirectory: 'lib',
            //                 style: true
            //               }
            //             ],
            //             // ['@babel/plugin-transform-runtime'],
            //         ]
            //     }
            // },
            {
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [ tsImportPluginFactory({
                            libraryName: 'antd',
                            libraryDirectory: 'lib',
                            style: true
                          })
                           ]
                    }),
                }
            }
        ]
    }
]