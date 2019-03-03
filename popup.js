chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === 'getSource') {
        message.innerText = request.source;
        let xhr = new XMLHttpRequest();
        xhr.open(
            "POST",
            chrome.extension.getURL('http://0.0.0.0:8000/'),
            true
        );
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(
            JSON.stringify({"content": request.source})
        );
    }
});

function onWindowLoad() {

    let message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: 'getPageSource.js'
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });

}

window.onload = onWindowLoad;
