let previousTitle = '';
let previousArtist = '';
let currentPlaybackTime = '';

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.clear(() => {
    });
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.clear(() => {
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'TRACK_INFO') {
        const title = request.title;
        const artist = request.artist;

        if (title !== previousTitle || artist !== previousArtist) {
            previousTitle = title;
            previousArtist = artist;

            let apiUrl = `http://ec2-15-164-11-77.ap-northeast-2.compute.amazonaws.com/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`;
            
            chrome.storage.local.set({ lyricsData: "로딩 중..", title: title, artist: artist });

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if(data.detail == "Song not found"){
                        chrome.storage.local.set({ lyricsData: "😭가사 데이터가 없습니다😭"});
                    }
                    else{
                        chrome.storage.local.set({ lyricsData: data});
                    }
                })
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
        const width = 350;
        const height = 300;
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