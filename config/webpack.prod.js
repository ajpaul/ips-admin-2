const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  // one of my many failed attempts at extracting the CSS from inline JS
  // I get to 94% in the build process and then errors appear
  // module: {
	// 	loaders: [
	// 		{ test: /(component|container|list|details)\.less$/, loader: ExtractTextPlugin.extract({
	// 			fallbackLoader: "style-loader",
	// 			loader: "less-loader"
	// 		}) },
    //         { test: /^((?!component|container|list|details).)*.less$/, loader: ExtractTextPlugin.extract({
	// 			fallbackLoader: "style-loader",
	// 			loader: "less-loader"
	// 		}) },
    //         { test: /\.css$/, loader: ExtractTextPlugin.extract({
	// 			fallbackLoader: "to-string-loader",
	// 			loader: "css-loader"
	// 		}) }
	// 	]
	// },


  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: ([
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]),

  	// Pretty terminal output
    stats: { colors: true },
});