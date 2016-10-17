module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve:{
    root: __dirname,
    alias: {
      LoginForm:'app/components/LoginForm.jsx',
      ShowUser:'app/components/ShowUser.jsx',
      EditUser:'app/components/EditUser.jsx',
      NewUser:'app/components/NewUser.jsx'
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
    }]
  }
}
