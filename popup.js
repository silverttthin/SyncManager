document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === 'UPDATE_POPUP') {
            const timeDisplayDiv = document.getElementById('time-display');
            timeDisplayDiv.textContent = `${request.title} - ${request.currentTime}`;
        }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: getCurrentTimeAndTitle
        });
    });

    function getCurrentTimeAndTitle() {
        const titleElement = document.querySelector('ytmusic-player-bar .title');
        const timeElement = document.querySelector('ytmusic-player-bar .time-info');

        if (timeElement && titleElement) {
            const title = titleElement.textContent;
            const currentTime = timeElement.textContent;

            chrome.runtime.sendMessage({
                type: 'UPDATE_POPUP',
                title: title,
                currentTime: currentTime
            });
        } else {
            console.log('제목 또는 시간 요소를 찾을 수 없습니다.');
        }
    }
});