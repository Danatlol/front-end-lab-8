const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");


module.exports = {
    entry: {
        app: './src/app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
              })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['bin']),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            title: 'Homework 9',
            template: 'src/app.html'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'bin')
    }
};