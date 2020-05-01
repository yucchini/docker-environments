'use strict'

const APP_DIR = process.env.APP_DIR || '/myapp';
const src = APP_DIR;
const dist = APP_DIR + '/public/assets';
const glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // bundle後にCSSを別ファイルに分けるためのプラグイン
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  context: src,
  entry: {
    home: './frontend/src/index.tsx',
    bundlecss: './frontend/styles/index.scss',
    images: glob.sync('./frontend/images/**/*'),
  },
  output: {
    path: dist,
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 3 } },
          'postcss-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|jpe?g|png|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../[path][name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new ManifestPlugin({
      filename: 'manifest.json',
      publicPath: '/assets/',
      writeToFileEmit: true
    }),
  ],
  optimization: {
    splitChunks: {
      // cacheGroup内にバンドルの設定を複数記述できる
      cacheGroups: {
        // 今回はvendorだが、任意の名前で問題ない
        vendor: {
          // node_modules配下のモジュールをバンドル対象とする
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          // モジュールが正確に一致したときに新しいチャンクを作成する代わりに、既存のチャンクを再利用できる
          reuseExistingChunk: true
        },
        lib: {
          test: /frontend\/src\/lib[\\/]/,
          name: 'lib',
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    }
  }
};
