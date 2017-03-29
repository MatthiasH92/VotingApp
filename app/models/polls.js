'use strict';

var mongo = require('mongodb').MongoClient,
    polls;

mongo.connect('mongodb://localhost:27017/votingapp', function (err, db) {
    if (err) {
        throw new Error('connecting to Database unsuccessfully');
    } else {
        console.log("connected successfully");
    }
    polls = db.collection('polls');
});

exports.create = function(poll, cb) {
    polls.insertOne(poll, function (err) {
        if (err) {
            throw err;
        }
        polls.findOne(poll, function (err, doc) {
            if (err) {
                throw err;
            }
            cb(doc);
        });
    });
};

exports.all = function (cb) {
    var cursor = polls.find();
    cursor.toArray(function(err, doc) {
        cb(doc);
    });
};

exports.single = function (question, cb) {
    var cursor = polls.find({question : question});
    cursor.toArray(function(err, doc) {
        cb(doc[0]);
    });
};

exports.update = function (poll, answer, cb) {
    var answers = poll["answers"];
    for (var i = answers.length - 1; i >= 0; i--) {
        if (answers[i].answer === answer) {
            answers[i].counter++;
        }
    }
    polls.updateOne({ "question": poll.question },
        {$set: { answers: answers}}, function () {
            exports.single(poll.question, function (doc) {
                if (doc) {
                    cb(doc);
                }
            });
        }
    );
};