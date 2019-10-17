const {pathResolve, cacheDirectory} = require('../../utils');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = [
    // src规则
    {
        // test: /\.((s[ac])|c)ss$/,
        test: /\.(le|c)ss$/,
        include: [pathResolve('../../src')],
        use:[
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'cache-loader',
                options: {
                    cacheDirectory, 
                }
            },
            'css-modules-typescript-loader',
            {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localsConvention: 'camelCase',
                  sourceMap: true
                }
            },
            {
                loader: 'less-loader',
                options: {
                    // 禁止内联js代码
                    javascriptEnabled: true,
                    sourceMap: true,
                    noIeCompat: true,
                    paths: [pathResolve('../../src/renderers/styles'),],
                }
            }
        //     {
        //         loader: 'sass-loader',
        //         options: {
        //             implementation: require('sass'),
        //             sassOptions: {
        //                 fiber: require('fibers'),
        //                 includePaths: [pathResolve('../../src/renderers/styles')],
        //             },
                    
        //         }
        //     }
        ],

    },
    // antd规则
    {
        test: /\.(le|c)ss$/, 
        include:[pathResolve('../../node_modules/antd')],
        use:[
            {
                loader: 'cache-loader',
                options: {
                    cacheDirectory, 
                }
            },
            'style-loader',
            'css-modules-typescript-loader',
            {
                loader: 'css-loader',
                options: {
                  localsConvention: 'camelCase',
                  sourceMap: true
                }
            },
            {
                loader: 'less-loader',
                options: {
                    // 禁止内联js代码
                    javascriptEnabled: true,
                    sourceMap: true,
                    noIeCompat: true,
                }
            }
        ]
    }
]