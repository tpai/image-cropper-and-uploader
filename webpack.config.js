/* global __dirname */
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');

module.exports = {
    resolve: {
        root: [path.resolve('./src')],
        extensions: ['', '.js', '.jsx', '.css', '.scss'],
    },
    output: {
        path: path.resolve(__dirname, 'www/dist/'),
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
        ],
        loaders: [
            {
                test: /\.scss|\.css$/,
                loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!sass!postcss?pack=cleaner',
            },
            {
                test: /\.jsx?/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel'],
            },
        ],
    },
    postcss: webpack => ({
        defaults: [postcssImport, autoprefixer],
        cleaner: [
            postcssImport({
                addDependencyTo: webpack,
                path: [path.resolve(__dirname, '/src')],
            }),
            autoprefixer({ browsers: ['> 5%'] }),
        ],
    }),
};
