document.addEventListener('DOMContentLoaded', function() {
    function updateDisplay() {
        chrome.runtime.sendMessage({ type: 'GET_LYRICS' }, function(response) {
            const titleDisplayDiv = document.getElementById('title-display');
            const artistDisplayDiv = document.getElementById('artist-display');
            const lyricsDisplayDiv = document.getElementById('lyrics-display');
            const timeDisplayDiv = document.getElementById('time-display');

            if (response.lyrics) {
                lyricsDisplayDiv.innerHTML = '';
                response.lyrics.forEach(line => {
                    const lineElement = document.createElement('div');
                    lineElement.textContent = `${line.timestamp} - ${line.original}`;
                    lyricsDisplayDiv.appendChild(lineElement);
                });
            } else {
                lyricsDisplayDiv.textContent = '가사 데이터를 가져오는 중...';
            }

            titleDisplayDiv.textContent = response.title || '정보를 가져오는 중...';
            artistDisplayDiv.textContent = response.artist || '정보를 가져오는 중...';
            timeDisplayDiv.textContent = response.currentTime || '재생 시각을 가져오는 중...';
        });

        chrome.storage.local.get(['title', 'currentTime'], function(data) {
            const timeDisplayDiv = document.getElementById('time-display');
            if (data.title && data.currentTime) {
                timeDisplayDiv.textContent = `${data.currentTime}`;
            } else {
                timeDisplayDiv.textContent = '정보를 가져오는 중...';
            }
        });
    }

    updateDisplay(); // 페이지 로드 시 즉시 호출
    setInterval(updateDisplay, 1000); // 1초 간격으로 업데이트
});