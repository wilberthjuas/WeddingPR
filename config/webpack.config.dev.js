// Development Config Mode
const webpackConfig = {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      port: 5000,
      open: true,
      //host:"10.1.88.219",
      disableHostCheck: true,
      proxy: {
         "/api": "http://localhost:9000"
      },
      historyApiFallback: true
   },
};

// Export module
module.exports = webpackConfig;