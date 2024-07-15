function getCurrentTrackInfo() {
    const titleElement = document.querySelector('ytmusic-player-bar .title');
    const artistElement = document.querySelector('ytmusic-player-bar .byline');

    if (titleElement && artistElement) {
        const title = titleElement.textContent;
        const artistFull = artistElement.textContent;
        const artist = artistFull.split('•')[0].trim();

        console.log(`${title} ${artist} sent to background!`);

        chrome.runtime.sendMessage({
            type: 'TRACK_INFO',
            title: title,
            artist: artist
        });

        return true;
    } else {
        console.log('제목 또는 아티스트 요소를 찾을 수 없습니다.');
        return false;
    }
}

function getCurrentPlaybackTime() {
    const timeElement = document.querySelector("#left-controls > span");

    if (timeElement) {
        const currentTime = timeElement.innerText.split(" / ")[0].trim();
        console.log(`Current time: ${currentTime}`);

        chrome.runtime.sendMessage({
            type: 'PLAYBACK_TIME',
            currentTime: currentTime
        });
    } else {
        console.log('재생 시각 요소를 찾을 수 없습니다.');
    }
}

// MutationObserver 설정
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            if (getCurrentTrackInfo()) {
                // 성공적으로 데이터를 가져오면 더 이상 관찰하지 않음
                observer.disconnect();
            }
        }
    });
});

// DOM이 로드되었을 때와 URL이 변경되었을 때 실행
function initializeObserver() {
    const targetNode = document.querySelector('ytmusic-player-bar');
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initializeObserver);

// URL 변경을 감지하는 함수
let lastUrl = location.href;
new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        initializeObserver(); // URL이 변경되면 다시 관찰 시작
    }
}).observe(document, { subtree: true, childList: true });

// 현재 재생 시각을 지속적으로 확인
setInterval(getCurrentPlaybackTime, 100); // 1초 간격으로 재생 시각 확인