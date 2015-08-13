function createWebpackMiddleware() {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('../../webpack.config');

  return webpackDevMiddleware(webpack(config), {
    stats: {
      colors: true
    },
    noInfo: true,
    publicPath: '/',
    historyApiFallback: true
  });
}

module.exports = createWebpackMiddleware;
