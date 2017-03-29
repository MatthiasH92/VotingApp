'use strict';

(function () {
    var apiUrl = 'http://localhost:3000/api/clicks';
    var allPolls = document.querySelector("#allPolls");
    var pollContent = document.querySelector("#pollContent");

    ready();

    ajaxRequest('get', apiUrl, function (res) {
        var polls = JSON.parse(JSON.parse(res))['polls'];
        for (var i = polls.length - 1; i >= 0; i--) {
            createPollListItem(polls[i]);
        }
    });

    function createPollListItem(poll) {
        var li = document.createElement("li");
        var liItem = document.createElement('button');
        liItem.appendChild(document.createTextNode(poll.question));
        li.appendChild(liItem);

        li.addEventListener('click', replacePollElements);
        function replacePollElements() {
            document.querySelector('#pollQuestion').innerHTML = poll.question;
            var newList = document.createElement("ul");
            for (var i = poll['answers'].length - 1; i >= 0; i--) {
                newList.appendChild(createPollAnswer(poll.answers[i]));
            }
            var oldList = document.getElementById('allAnswers');
            oldList.parentNode.replaceChild(newList, oldList);
            newList.setAttribute('id', 'allAnswers');
        }

        function createPollAnswer(answer) {
            var newAnswer = document.createElement("p");
            var answerElement = document.createTextNode(answer.answer + " : ");
            var counter = document.createTextNode(answer.counter.toString());
            var btn = document.createElement('BUTTON');
            btn.appendChild(document.createTextNode('Vote'));

            btn.addEventListener('click', function () {
                ajaxRequest('post', apiUrl, loadPoll, function (xmlhttp) {
                    xmlhttp.setRequestHeader("question", poll.question);
                    xmlhttp.setRequestHeader("answer", answer.answer);
                });
            });

            function loadPoll(response) {
                poll = JSON.parse(JSON.parse(response));
                replacePollElements();
            }

            newAnswer.appendChild(answerElement);
            newAnswer.appendChild(counter);
            newAnswer.appendChild(btn);
            return newAnswer;
        }

        allPolls.appendChild(li);
    }
})();