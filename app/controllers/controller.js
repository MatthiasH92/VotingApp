function ready(fn) {
    if (typeof fn === 'function') {
        if (document.readyState === 'complete') {
            return fn();
        }
        document.addEventListener('DOMContentLoaded', fn, false);
    }
}

function ajaxRequest(method, url, callback, modifyRequest) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            if (typeof callback === 'function') {
                callback(xmlhttp.response);
            }
        }
    };

    xmlhttp.open(method, url, true);
    if (typeof modifyRequest === 'function') {
        modifyRequest(xmlhttp);
    }
    xmlhttp.send();
}