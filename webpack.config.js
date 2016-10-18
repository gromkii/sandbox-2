module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve:{
    root: __dirname,
    alias: {
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
    }]
  }
}
