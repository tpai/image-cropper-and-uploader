/* global __dirname */
const webpack = require('webpack');
const objectAssign = require('object-assign');
const defaultConfig = require('./webpack.config.js');

module.exports = objectAssign({}, defaultConfig, {
    entry: './src/index',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            __DEVELOPMENT__: JSON.stringify(false),
        }),
    ],
});
