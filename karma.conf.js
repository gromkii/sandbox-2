var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files:[
      'node_modules/jquery/dist/jquery.min.js',
      'test/**/*.test.jsx'
    ],
    preprocessors: {
      'test/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    client:{
      mocha:{
        timeout:'5000'
      }
    },
    webpack:webpackConfig,
    webpackServer: {
      noInfo: true
    },
    proxies: {
      '/auth':'http://localhost:3000/auth',
      '/api':'http://localhost:3000/api'
    }
  });
};
