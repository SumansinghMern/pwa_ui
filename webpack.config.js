const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const MinCssExtactPlugin = require('mini-css-extract-plugin');

const InterPolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const Dotenv = require('dotenv-webpack');

const {InjectManifest} = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    stats: {
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [MinCssExtactPlugin.loader,"css-loader"]
            },
            {
                test: /\.(j?g|png|svg|gif)?$/,
                use: 'file-loader?name=./images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),

        new MinCssExtactPlugin({
            filename:"[name].css",
            chunkFilename:"[id].css"
        }),

        new InterPolateHtmlPlugin(HtmlWebpackPlugin,{
            PUBLIC_URL:'http://localhost:8080/public'
        }),

        new Dotenv({
            path:'./.env',
            systemvars:true
        }),
        new CopyPlugin({
            patterns:[
                { from: './src/favicon.ico', to:''  },
                { from: './src/logo192.png', to: '' },
                { from: './src/logo512.png', to: '' },
                { from: './src/manifest.json', to: '' },
            ],  
        }),

        new InjectManifest({
            swSrc:'./src/src-sw.js',
            swDest:'sw.js'
        })
    ],
};