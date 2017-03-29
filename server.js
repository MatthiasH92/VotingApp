'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js');

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/views', express.static(process.cwd() + '/app/views'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

routes(app);

app.listen(3000, function () {
    console.log("listening on port 3000");
});
