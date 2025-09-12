const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 

module.exports = {
  mode: 'development', 
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
      port: 3000,
      open: true,
      liveReload: true,
      // Rewrites URLS - redirect to the correct pages 
      historyApiFallback: {
        rewrites: [
          { from: /^\/$/, to: '/index.html' },
          { from: /^\/question$/, to: '/question/index.html' },
          { from: /^\/winner$/, to: '/winner/index.html' }
        ]
      },
    },

    plugins: [
      // Gen Index.html
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),

      // Gen /question/index.html for /question)
      new HtmlWebpackPlugin({
        template: './src/pages/question/index.html',
        filename: 'question/index.html'
      }),

      // Gen /winner/index.html for /winner)
      new HtmlWebpackPlugin({
        template: './src/pages/winner/index.html',
        filename: 'winner/index.html'
      }),

      new CopyWebpackPlugin({
        patterns: [
        { from: path.resolve(__dirname, 'src/images'), to: 'images' },
        ],
      }),
    ],

   module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(ttf)$/i,
      type: 'asset/resource',
    }
  ]
}
}