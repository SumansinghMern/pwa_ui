const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    context:__dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath:'/'
    },
    devServer:{
        historyApiFallback:true,
    },
    stats:{
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:'babel-loader'
            },
            {
                test:/\.css$/,
                use:["css-loader","style-loader"]
            },
            {
                test: /\.(j?g|png|svg|gif)?$/,
                use: 'file-loader?name=./images/[name].[ext]'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'public/index.html'),
        filename:'index.html'
    })],
};