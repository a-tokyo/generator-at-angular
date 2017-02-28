const webpack = require('webpack');

module.exports = function(_path) {
  return {
    context: _path,
    devtool: 'cheap-source-map',
    devServer: {
      contentBase: './dist',
      info: true,
      hot: true,
      inline: true,
      host: '0.0.0.0',
      port: 8080
      // // uncomment the following lines if you need to configure a proxy for dev env
      // // configure proxy
      // proxy: {
      //   '/api/*': {
      //     target: 'https://jsonplaceholder.typicode.com/',
      //     changeOrigin: true,
      //     // uncomment this if you need to remove the /api prefix from the url
      //     // pathRewrite: {'^/api': ''},
      //   }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
