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

setInterval(getCurrentTimeAndTitle, 1000);