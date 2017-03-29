'use strict';
var ClickHandler = require(process.cwd() + '/app/controllers/server.clickHandler.js');

module.exports = function (app) {

    var clickHandler = new ClickHandler();

    app.route('/').get(function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });

    app.route('/api/clicks').get(clickHandler.loadPolls).put(clickHandler.createPoll).post(clickHandler.updatePoll);
};