var path = require('path');
var webpack = require('webpack');

function isDev() {
  var env = process.env.NODE_ENV || 'development';
  return env == 'development';
}

function buildEntryPoint(entryPoint) {
  var result = [];

  if(isDev()) {
    // WebpackDevServer host and port
    result.push('webpack-dev-server/client?http://0.0.0.0:3000' );

    // "only" prevents reload on syntax errors
    result.push('webpack/hot/only-dev-server');
  }

  result.push(entryPoint)
  return result;
}

function setupJsLoader() {
  var loaders = [];

  if (isDev()) {
    loaders.push('react-hot')
  }

  loaders.push('babel?presets[]=es2015,presets[]=react')
  return loaders;
}

module.exports = {
  context: path.join(__dirname, './ClientApp'),
  entry: {
    index: buildEntryPoint('./Index')
  },
  output: {
    path: path.join(__dirname, './wwwroot/js'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:3000/js/'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        loaders: setupJsLoader(),
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ],
  },
  resolve: {
    root: path.resolve('./ClientApp'),
    // Allow require('./blah') to require blah.jsx
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    // Use external version of React (from CDN for client-side, or
    // bundled with ReactJS.NET for server-side)
    // react: 'React',
  }
};