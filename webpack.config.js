var path = require('path');
var webpack = require('webpack');
// var dev=process.env.NODE_ENV==='dev';
// var glob = require("glob");

module.exports = {
  devtool: 'eval',
  resolve:{
    extensions:['', '.js', '.jsx']
  },
  entry: './javascripts/main.js',
  output: {
    path: __dirname+ '/dist/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: [ 'babel?{"presets": ["es2015", "react", "stage-0", "stage-3"], "plugins": [ "transform-runtime", "syntax-async-functions", "transform-function-bind"]}'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: []
};
