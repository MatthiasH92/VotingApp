'use strict';

(function () {
    var apiUrl = 'http://localhost:3000/api/clicks';
    var pollText = document.querySelector("#poll");
    var addAnswer = document.querySelector("#addAnswer");
    var createPollBtn = document.querySelector("#createPoll");

    ready();

    addAnswer.addEventListener('click', addAnswerField);
    function addAnswerField() {
        var newAnswer = document.createElement("input");
        newAnswer.type = 'text';
        newAnswer.className = 'answer';
        addAnswer.parentNode.insertBefore(newAnswer, addAnswer);
    }
    addAnswerField();
    addAnswerField();

    createPollBtn.addEventListener('click', function () {
        ajaxRequest('put', apiUrl, null, function (xmlhttp) {
            xmlhttp.setRequestHeader('question', pollText.value);
            var answers = document.querySelectorAll('.answer');
            for (var i = answers.length - 1; i >= 0; i--) {
                xmlhttp.setRequestHeader('answer' + i, answers[i].value);
            }
        });
    });
})();

