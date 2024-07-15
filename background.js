let previousTitle = '';
let previousArtist = '';
let currentPlaybackTime = '';

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.clear(() => {
        console.log('로컬 스토리지 비움.');
    });
    previousTitle = '';
    previousArtist = '';
    currentPlaybackTime = '';
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.clear(() => {
        console.log('로컬 스토리지 비움.');
    });
    previousTitle = '';
    previousArtist = '';
    currentPlaybackTime = '';
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'TRACK_INFO') {
        const title = request.title;
        const artist = request.artist;

        console.log(`받아온 현재 데이터: ${title} ${artist}`);
        console.log(`이전 데이터: ${previousTitle} ${previousArtist}`);

        if (title !== previousTitle || artist !== previousArtist) {
            previousTitle = title;
            previousArtist = artist;

            let apiUrl = `http://ec2-15-164-11-77.ap-northeast-2.compute.amazonaws.com/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('서버에서 데이터를 받아와 로컬에 가사, 제목, 아티스트를 저장합니다.');
                    chrome.storage.local.set({ lyricsData: data, title: title, artist: artist });
                })
                .catch(error => {
                    console.error('가사 데이터를 가져오는 중 오류 발생:', error);
                });
        }

    }

    if (request.type === 'PLAYBACK_TIME') {
        currentPlaybackTime = request.currentTime;
        chrome.storage.local.set({ currentTime: currentPlaybackTime });
    }

    if (request.type === 'GET_LYRICS') {
        chrome.storage.local.get(['lyricsData', 'title', 'artist', 'currentTime'], function (data) {
            sendResponse({ lyrics: data.lyricsData, title: data.title, artist: data.artist, currentTime: data.currentTime });
        });
    }

    return true;  // sendResponse를 비동기적으로 호출할 때 필요합니다.
});

chrome.action.onClicked.addListener((tab) => {
    chrome.windows.getCurrent((currentWindow) => {
        const width = 300;
        const height = 400;
        const left = currentWindow.left + currentWindow.width - width - 20;
        const top = currentWindow.top + currentWindow.height - height - 20;

        chrome.windows.create({
            url: chrome.runtime.getURL('popup.html'),
            type: 'popup',
            width: width,
            height: height,
            left: left,
            top: top
        });
    });
});