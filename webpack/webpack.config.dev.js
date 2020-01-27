const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(`dist`),
    publicPath: '/',
    filename: `emails-editor.js`,
  },
  devServer: {
    contentBase: path.resolve('dist'),
    hot: true,
    port: 8080,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      template: path.resolve('index.html'),
    }),
  ],
})
