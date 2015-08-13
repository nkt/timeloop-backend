const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  debug: env === 'development',
  devtool: env === 'development' ? '#source-maps' : null,
  context: __dirname,
  entry: {
    index: [
      './browser/index.js',
      './browser/styles/index.less'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less')
      },
      {
        test: /\.(svg|eot|ttf|woff)/,
        loaders: ['url']
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './browser/index.html'
    }),
    new ExtractTextPlugin('index.css', {
      allChunks: true
    })
  ]
};
