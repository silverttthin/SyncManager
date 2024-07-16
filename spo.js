function getCurrentTrackInfo() {
    const titleElement = document.querySelector('[data-testid="context-item-info-title"] a')
    const artistElement = document.querySelector('[data-testid="context-item-info-subtitles"] a');

    if (titleElement && artistElement) {
        const title = titleElement.textContent;
        const artist = artistElement.textContent;

        console.log(title, artist)

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
    const timeElement = document.querySelector("#main > div > div.ZQftYELq0aOsg6tPbVbV > div.JG5J9NWJkaUO9fiKECMA > footer > div > div.sVv2OQORCQ4kf6iKfUTF > div > div.pn5V0OzovI9p6b8nWq8p.gglUjikTBtMzCZFgSmpS > div.encore-text.encore-text-marginal.encore-internal-color-text-subdued.IPbBrI6yF4zhaizFmrg6");
    if (timeElement) {
        const currentTime = timeElement.innerText.split(" / ")[0].trim();
        // console.log(`Current time: ${currentTime}`);

        chrome.runtime.sendMessage({
            type: 'PLAYBACK_TIME',
            currentTime: currentTime
        });
    } else {
        console.log('재생 시각 요소를 찾을 수 없습니다.');
    }
}

setInterval(() => {
    getCurrentTrackInfo();
}, 500);

setInterval(() => {
    getCurrentPlaybackTime();
}, 100); // 1초 간격으로 업데이트