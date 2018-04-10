var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath
  })
  .listen(7095, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

});
