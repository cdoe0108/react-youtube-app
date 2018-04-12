var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var environment = {
  production: true
}
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

var development = [HTMLWebpackPluginConfig];
var production = [
  HTMLWebpackPluginConfig,
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
 // new CopyWebpackPlugin(vendor),
  new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false,
  compress: {
         // remove warnings
            warnings: false,

         // Drop console statements
            drop_console: false
       }
    })
];

var entry ={
  production: [
    './src/index.js'
  ],
  development: [
    'webpack-dev-server/client?http://localhost:7095',
    './src/index.js'
  ]
}


module.exports = {
  devtool: environment.production ? null : 'sourcemap',
  entry: environment.production ? entry.production : entry.development,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
      },
      {
        test: /\.less$/,
        loaders: ["style", "css", "less"]
      },
      {
       test: /\.(png|woff|woff2|eot|ttf|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: 'url-loader?limit=10000&mimetype=application/font-woff'
     }
    ]
  },
  plugins: environment.production ? production : development
}
