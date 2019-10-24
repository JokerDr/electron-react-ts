const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const optimizeCSSAssetPlugin = require('optimize-css-assets-webpack-plugin') ;

module.exports = {
    // runtimeChunk: {
    //     name: 'manifest'
    // },
    splitChunks: {
        cacheGroups: {
            default: false,
            commons: {
                test:/[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all',
            }
        }
    },
    minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
        }),
        new optimizeCSSAssetPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                reduceIdents: false,
                autoprefixer: false,
            }
        })
    ]
}
