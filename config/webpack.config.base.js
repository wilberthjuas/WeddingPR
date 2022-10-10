//Imports statements
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const {
   CleanWebpackPlugin
} = require("clean-webpack-plugin");

// Joins path
const mergePaths = (...paths) => paths.join('/');

const basePath = __dirname;
const distPath = 'dist';

const rootPath = '.';
const publicPath = mergePaths(rootPath, 'public');
const srcPath = mergePaths(rootPath, 'src');

const paths = {
   dist: path.resolve(basePath, '..', distPath),
   entry: mergePaths(srcPath, 'client', 'index.js'),
   favicon: mergePaths(srcPath, 'client', 'docs', 'img', 'icons', 'favicon.ico'),
   manifest: mergePaths(publicPath, 'manifest.json'),
   i18n: mergePaths(srcPath, 'i18n.js' ),
   main: { 
      input: mergePaths(publicPath, 'index.html'),
      output: 'index.html'
   }
}

//Global Config
function webpackConfigGenerator(env) {

   const devMode = !!env.development;

   const webpackInitConfig = {
      resolve: {
         extensions: ['.js', '.jsx', '.css', '.sass', '.scss', '.woff', '.woff2', '.eot', '.ttf', 'svg'],
      },
      entry: {
         app: ['@babel/polyfill', paths.i18n, paths.entry],
      },
      output: {
         /* publicPath: publicPath, */
         path: paths.dist,
         filename: '[chunkhash][name].js'
      },
      module: {
         rules: [{
               test: /\.(js|jsx)/,
               exclude: /(node_modules|dist)/,
               use: [
                  'babel-loader',
                  /* 'eslint-loader' */
               ]
            },
            {
               test: /\.(css|sass|scss)/,
               exclude: /(node_modules|dist)/,
               use: [
                  {
                     loader: MiniCSSExtract.loader,
                     options: {
                        hmr: devMode,
                        publicPath: (resourcePath, context) => {
                           return path.relative(path.dirname(resourcePath), context) + '/';
                        },
                     }
                  },
                  {
                     loader: 'css-loader',
                     options: {
                        sourceMap: devMode
                     }
                  },
                  {
                     loader: 'postcss-loader',
                     options: {
                        sourceMap: devMode
                     }
                  },
                  {
                     loader: 'sass-loader',
                     options: {
                        sourceMap: devMode,
                        includePaths: [
                           /* path.resolve(__dirname, '../node_modules/foundation-sites/scss') */
                        ]
                     }
                  }
               ],
            },
            {
               test: /\.(pdf|jpeg|jpg|jpf|png|gif|svg|ico|cur|woff|woff2|eot|otf|ttf)$/,
               use: [
                  {
                     loader: 'file-loader'
                  }
               ],
            },
         ]
      },
      plugins: [
         new CleanWebpackPlugin(),
         new HTMLWebpackPlugin({
            filename: paths.main.output,
            template: paths.main.input,
            favicon: paths.favicon
         }),
         new MiniCSSExtract({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
         }),
         new InterpolateHtmlPlugin({
            PUBLIC_URL: publicPath
         }),
         new webpack.DefinePlugin({
            ENV: JSON.stringify(env)
         }),
      ]
   };

   return webpackInitConfig;
}

// Export module
module.exports = webpackConfigGenerator;