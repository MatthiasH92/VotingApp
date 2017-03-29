'use strict';

(function () {
    var myPollsButton = document.querySelector('#view');
    var createPollButton = document.querySelector('#create');

    myPollsButton.addEventListener('click', function () {
        document.getElementById('content').innerHTML = '<object type="text/html" data="../views/allPolls.html" class="content"></object>';
    });

    createPollButton.addEventListener('click', function () {
        document.getElementById('content').innerHTML = '<object type="text/html" data="../views/createPoll.html" class="content"></object>';
    });
})();