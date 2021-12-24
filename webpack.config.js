const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    index: path.resolve(__dirname, 'index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    host: 'localhost',
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ['ts-loader']
    }, {
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                "postcss-preset-env",
                {
                  // Options
                },
              ],
              [
                "autoprefixer"
              ]
            ],
          }
        }
      }, 'sass-loader'],
    }]
  },
  plugins: [
    new EslintWebpackPlugin({
      extensions: ['.ts', '.tsx']
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
