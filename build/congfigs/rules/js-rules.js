const {cacheDirectory} = require('../../utils');
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = [
    {
        test: /\.(j|t)s(x?)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
            {
                loader: 'cache-loader',
                options: {
                    cacheDirectory, 
                }
            },
            {
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                      before: [ 
                          tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                // with less
                                style: true
                            }) 
                        ]
                    }),
                  },
            }
        ]
    }
]