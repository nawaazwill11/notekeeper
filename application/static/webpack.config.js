const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // context: path.resolve(__dirname, 'app'),
    entry: {
      home: __dirname + '/src/home.js',
    },
    output: {
      path: __dirname + '/dist',
      filename: 'css/[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: "Webpack Output",
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader'
              },
            ],
          },
        ]
    },
    devServer: {
        contentBase: './dist',
        open: true
    },
};