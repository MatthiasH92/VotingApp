'use strict';

function clickHandler() {

    var Polls = require('../models/polls');

    this.createPoll = function (req, res) {
        Polls.create(createPoll(req), function (doc) {
            if (doc) {
                res.json(JSON.stringify(doc));
            }
        });
        function createPoll(req) {
            var poll = {'question': req.get('question'), answers: []};
            var answerNr = 0;
            var nextAnswer = req.get('answer' + answerNr);
            while (nextAnswer) {
                poll.answers.push({answer: nextAnswer, counter: 0});
                nextAnswer = req.get('answer' + ++answerNr);
            }
            return poll;
        }
    };

    this.loadPolls = function (req, res) {
        Polls.all(function (docs) {
            if (docs) {
                var wrapper = {wrap: 'wrap', polls: docs};
                res.json(JSON.stringify(wrapper));
            }
        });
    };

    this.updatePoll = function (req, res) {
        Polls.single(req.get('question'), function (doc) {
            if (doc) {
                Polls.update(doc, req.get('answer'), function (updatedPoll) {
                    if (updatedPoll) {
                        res.json(JSON.stringify(updatedPoll));
                    }
                })
            }
        });
    };
}

module.exports = clickHandler;
