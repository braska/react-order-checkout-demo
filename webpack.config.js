const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const addHash = (template, hash) => (NODE_ENV === 'production' ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : template);

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    polyfill: ['babel-polyfill'],
    main: (files => (NODE_ENV !== 'production' ? [
      'react-hot-loader/patch',
      // activate HMR for React

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
    ] : []).concat(files))(['./js/app']),
    vendor: ['./js/vendor'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
    filename: addHash('assets/js/[name].js', 'chunkhash'),
  },
  devtool: NODE_ENV !== 'production' ? 'cheap-inline-module-source-map' : 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['shared', 'node_modules'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html' }),

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(NODE_ENV !== 'production'),
      __GEOCODER_API_KEY___: JSON.stringify(process.env.GEOCODER_API_KEY),
    }),
    new CopyWebpackPlugin([
      {
        from: 'static',
      },
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8089,
    publicPath: '/',
    hot: NODE_ENV !== 'production',
  },
};

if (NODE_ENV !== 'production') {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
