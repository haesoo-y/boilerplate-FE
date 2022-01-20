const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  const prod = process.env.NODE_ENV === 'production';
  const mode = prod ? 'production' : 'development';
  const devtool = prod ? 'hidden-source-map' : 'eval';
  const cssLoader = ['css-loader'];
  const plugins = [new HtmlWebpackPlugin({ template: './src/index.html' }), new Dotenv()];
  if (prod) {
    cssLoader.unshift(MiniCssExtractPlugin.loader);
    plugins.push(new MiniCssExtractPlugin());
  } else {
    cssLoader.unshift('style-loader');
  }
  return {
    mode,
    devtool,
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: 'babel-loader',
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
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins,
    devServer: {
      host: 'localhost',
      historyApiFallback: true,
      port: 8080,
      hot: true,
    },
  };
};
