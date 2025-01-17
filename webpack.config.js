const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: [
    './index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './js/[name].bundle.js',
    publicPath: '/',
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(html)$/,
        use: 'html-loader'
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: 'file-loader'
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    disableHostCheck: true,
    host: 'localhost',
    port: 3000,
    open: true,
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  },
  plugins: [
    new cleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new MiniCssExtractPlugin({
      filename: './public/styles.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}