const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(`dist`),
    filename: `emails-editor.js`
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
})
