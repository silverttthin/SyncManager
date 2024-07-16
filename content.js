console.log("This is YM content!")

function getCurrentTrackInfo() {
    const titleElement = document.querySelector('ytmusic-player-bar .title');
    const artistElement = document.querySelector('ytmusic-player-bar .byline');

    if (titleElement && artistElement) {
        const title = titleElement.textContent;
        const artistFull = artistElement.textContent;
        const artist = artistFull.split('•')[0].trim();

        chrome.runtime.sendMessage({
            type: 'TRACK_INFO',
            title: title,
            artist: artist
        });

        return true;
    } else {
        console.log('[SyncManager]: 제목 또는 아티스트 요소를 찾을 수 없습니다.');
        return false;
    }
}

function getCurrentPlaybackTime() {
    const timeElement = document.querySelector("#left-controls > span");
    if (timeElement) {
        const currentTime = timeElement.innerText.split(" / ")[0].trim();
        // console.log(`Current time: ${currentTime}`);

        chrome.runtime.sendMessage({
            type: 'PLAYBACK_TIME',
            currentTime: currentTime
        });
    } else {
        console.log('[SyncManager]: 재생 시각 요소를 찾을 수 없습니다.');
    }
}


setInterval(() => {
    getCurrentTrackInfo();
}, 500);

setInterval(() => {
    getCurrentPlaybackTime();
}, 100); // 1초 간격으로 업데이트