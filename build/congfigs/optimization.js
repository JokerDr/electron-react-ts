module.exports = {
    runtimeChunk: {
        name: 'manifest'
    },
    splitChunks: {
        cacheGroups: {
            default: false,
            commons: {
                test:/[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all',
            }
        }
    }
}