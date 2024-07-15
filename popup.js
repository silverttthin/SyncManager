document.addEventListener('DOMContentLoaded', function() {
    let lyricsData = [];
    let currentLyricIndex = -1;

    function updateDisplay() {
        chrome.runtime.sendMessage({ type: 'GET_LYRICS' }, function(response) {
            const titleDisplayDiv = document.getElementById('title-display');
            const artistDisplayDiv = document.getElementById('artist-display');
            const timeDisplayDiv = document.getElementById('time-display');
            const lyricsDisplayDiv = document.getElementById('lyrics-display');

            if (response.lyrics) {
                titleDisplayDiv.textContent = response.title || '제목 정보를 가져오는 중...';
                artistDisplayDiv.textContent = response.artist || '가수 정보를 가져오는 중...';
                lyricsData = response.lyrics;
            } else {
                titleDisplayDiv.textContent = '제목 정보를 가져오는 중...';
                artistDisplayDiv.textContent = '가수 정보를 가져오는 중...';
                lyricsDisplayDiv.textContent = '가사 데이터를 가져오는 중...';
            }

            if (response.currentTime) {
                const currentTime = response.currentTime;
                timeDisplayDiv.textContent = currentTime;
                updateLyricsDisplay(currentTime);
            }
        });
    }

    function updateLyricsDisplay(currentTime) {
        const lyricsDisplayDiv = document.getElementById('lyrics-display');

        // 현재 재생 시각을 초 단위로 변환
        const currentSeconds = timeStringToSeconds(currentTime);

        // 현재 재생 시각에 부합하는 가사 소절을 찾기
        for (let i = 0; i < lyricsData.length; i++) {
            const lyricStartSeconds = timeStringToSeconds(lyricsData[i].timestamp);
            const nextLyricStartSeconds = i + 1 < lyricsData.length ? timeStringToSeconds(lyricsData[i + 1].timestamp) : Infinity;

            if (currentSeconds >= lyricStartSeconds && currentSeconds < nextLyricStartSeconds) {
                if (currentLyricIndex !== i) {
                    currentLyricIndex = i;
                    lyricsDisplayDiv.textContent = `${lyricsData[i].original}`;
                }
                break;
            }
        }
    }

    function timeStringToSeconds(timeString) {
        const parts = timeString.split(':');
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        return minutes * 60 + seconds;
    }

    updateDisplay(); // 페이지 로드 시 즉시 호출
    setInterval(updateDisplay, 100); // 100ms 간격으로 업데이트
});