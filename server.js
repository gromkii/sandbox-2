'use strict'

const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
})

app.listen(port, () => {
  console.log('Server is listening on %d', port);
});

module.exports = app;
