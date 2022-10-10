//Imports statements
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

// Production Config Mode
const webpackConfig = {
   mode: 'production',
   optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
      splitChunks: {
         chunks: 'all'
      }
   },
   devtool: 'none',
   /* plugins: [
      new OptimizeCssAssetsPlugin(),
   ], */
};

// Export module
module.exports = webpackConfig;