process.env.BABEL_ENV = 'web'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { productName } = require('../package.json')

const isDevMode = process.env.NODE_ENV === 'development'

const config = {
  name: 'web',
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    web: path.join(__dirname, '../src/renderer/main.js')
  },
  output: {
    path: path.join(__dirname, '../dist/web'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
              scss: 'vue-style-loader!css-loader!sass-loader',
              less: 'vue-style-loader!css-loader!less-loader',
            },
          },
        },
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              // eslint-disable-next-line
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|tif?f|bmp|webp|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 10000,
            name: 'fonts/[name]--[folder].[ext]',
          },
        },
      },
      {
        test: /\.docx$/,
        use: 'file-loader?name=[name].[ext]'
      },
    ],
  },
  node: {
    __dirname: isDevMode,
    __filename: isDevMode,
  },
  resolve: {
    fallback: {
      // fs: false,
      // os: require.resolve('os-browserify/browser'),
      // path: require.resolve('path-browserify'),
      fs: false,
      os: false,
      path: false,
    },
  },
  plugins: [
    // new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      excludeChunks: ['processTaskWorker'],
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
      nodeModules: false,
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({filename: 'styles.css'}),
    new webpack.DefinePlugin({
      'process.env.IS_WEB': 'true'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/renderer'),
      'vue$': 'vue/dist/vue.esm.js',
      src: path.join(__dirname, '../src/'),
      icons: path.join(__dirname, '../_icons/'),
    },
    extensions: ['.ts', '.js', '.vue', '.json', '.css', '.node', '.jsx'],
  },
  target: 'web',
}

/**
 * Adjust web for production settings
 */
if (isDevMode) {
  // any dev only config
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
    })
  )
} else {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../static'),
          to: path.join(__dirname, '../dist/web/static'),
          globOptions: {
            ignore: ['.*'],
          },
        },
      ],
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    })
  )
}

module.exports = config
