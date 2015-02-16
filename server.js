'use strict';

var controllers = require('./controllers/index'),
    bodyParser = require('body-parser'),
    express = require('express'),
    http = require('http');


var app, PORT, server;

app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes
app.use('/projects', controllers.projects);

PORT = process.env.PORT || 8000;

server = http.createServer(app);

server.listen(PORT, function onListen () {
  console.log('listening on port %d', PORT);
});
