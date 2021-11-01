const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  const prod = process.env.NODE_ENV === 'production';
  const mode = prod ? 'production' : 'development';
  const devtool = prod ? 'hidden-source-map' : 'eval';
  const cssLoader = [];
  const plugins = [new HtmlWebpackPlugin({ template: './src/index.html' }), new Dotenv()];
  if (prod) {
    cssLoader.push(MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader');
    plugins.push(new MiniCssExtractPlugin());
  } else {
    cssLoader.push('style-loader', 'css-loader', 'sass-loader');
  }
  return {
    mode,
    devtool,
    entry: './src/App.jsx',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: cssLoader,
        },
      ],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.js',
    },
    plugins,
    devServer: {
      host: 'localhost',
      historyApiFallback: true,
      port: 8080,
    },
  };
};
