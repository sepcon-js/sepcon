const webpack = require("webpack");

module.exports = {
    entry: {
        sepcon: ['./src/index.js'],
        example: ['./app/index.js'],
        tests: ['./test/tests.js']
    },
    output: {
        path: '/app',
        publicPath: '/',
        filename: '[name].js',
    },
    devtool: 'source-map',

    devServer: {
        colors:true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        host: 'localhost',
        port: 3000,
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
};