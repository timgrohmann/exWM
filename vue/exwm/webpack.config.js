const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  mode: 'development',
  module: {
    rules: [

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.styl$/,
        loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  },
  entry: ['./src/index.js'],
  output: {
    filename: 'app.[hash].js'
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: true
    })
  ]
}
