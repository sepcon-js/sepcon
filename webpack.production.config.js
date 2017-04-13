const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: {
        'sepcon': './src/index.js',
        'sepcon.min': './src/index.js'
    },
    output: {
        path: __dirname+'/dist',
        publicPath: './',
        filename: '[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: 'source-map',
    target: 'web',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            },
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.min\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),

    ],
    module: {
        loaders: [
            { test: /\.js$/, loader: "webpack-strip?strip[]=debug,strip[]=console.log,strip[]=console.info" }
        ]
    }
};