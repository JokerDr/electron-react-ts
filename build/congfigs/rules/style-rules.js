const {pathResolve, cacheDirectory} = require('../../utils');
module.exports = [
    {
        // test: /\.((s[ac])|c)ss$/,
        test: /\.(le|c)ss$/,
        
        include: [pathResolve('../../src'), pathResolve('../../node_modules/antd/lib')],
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
                  modules: true,
                  localsConvention: 'camelCase',
                  sourceMap: true
                }
            },{
                loader: 'less-loader',
                options: {
                    // 禁止内联js代码
                    javascriptEnabled: true,
                    sourceMap: true,
                    noIeCompat: true,
                    paths: [pathResolve('../../src/renderers/styles')],
                    // modifyVars: theme
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

    }
]