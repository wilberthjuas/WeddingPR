// Import Statements
const merge = require('webpack-merge');
const baseConfigGenerator = require('./webpack.config.base.js');
const prodConfig = require('./webpack.config.prod.js');
const devConfig = require('./webpack.config.dev.js');

// Enviroment Selector
function webpackEnviromentSelector(env) {
   let config;

   if (env.production) config = prodConfig;
   if (env.development) config = devConfig;

   const baseConfig = baseConfigGenerator(env);
   
   return merge(baseConfig, config);
}

// Export module
module.exports = webpackEnviromentSelector;