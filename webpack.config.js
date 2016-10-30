var webpack = require('webpack');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'bootstrap-loader',
    'script!axios/dist/axios.min.js',
    './app/app.jsx',
  ],
  externals: {
    jquery:'jQuery',
    axios:'axios'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$':'jquery',
      'jQuery':'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve:{
    root: __dirname,
    alias: {
      applicationStyles:'public/stylesheets/style.scss',
      Menu:'app/components/Menu.jsx',
      Main:'app/components/Main.jsx',
      LoginForm:'app/components/LoginForm.jsx',
      ShowUser:'app/components/ShowUser.jsx',
      EditUser:'app/components/EditUser.jsx',
      NewUser:'app/components/NewUser.jsx',
      ListUsers:'app/components/ListUsers.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      loader:'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      },
      test:/\.jsx?$/,
      exclude:/(node_modules|bower_components)/
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader',
    }
  ]
  }
}
