

const APP_DIR = process.env.APP_DIR || '/app';
const dist = APP_DIR + '/public/assets';

const merge = require('webpack-merge');
const common = require('./common.config.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const threadLoader = require('thread-loader');

threadLoader.warmup({}, [
  'ts-loader'
]);

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1,
              poolTimeout: Infinity,
              workerParalleJobs: 50
            },
          },
          { loader: 'ts-loader', options: { happyPackMode: true } },
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
  ],
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: dist,
    watchContentBase: true,
    open: true,
    openPage: '/',
    host: '0.0.0.0',
    port: 3002,
    publicPath: '/assets/',
    disableHostCheck: true,
    proxy: {
      '/': 'http://web:3000',
    },
  }
});
