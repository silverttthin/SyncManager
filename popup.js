document.addEventListener('DOMContentLoaded', function() {
    function updateDisplay() {
        chrome.runtime.sendMessage({ type: 'GET_LYRICS' }, function(response) {
            const titleDisplayDiv = document.getElementById('title-display');
            const artistDisplayDiv = document.getElementById('artist-display');
            const lyricsDisplayDiv = document.getElementById('lyrics-display');

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
        });

        chrome.storage.local.get(['title', 'currentTime'], function(data) {
            const timeDisplayDiv = document.getElementById('time-display');
            if (data.title && data.currentTime) {
                timeDisplayDiv.textContent = `${data.title} - ${data.currentTime}`;
            } else {
                timeDisplayDiv.textContent = '정보를 가져오는 중...';
            }
        });
    }

    updateDisplay(); // 페이지 로드 시 즉시 호출
    setInterval(updateDisplay, 100); // 100ms 간격으로 업데이트
});



// document.addEventListener('DOMContentLoaded', function () 
// {
//     const titleDisplayDiv = document.getElementById('title-display');
//     const artistDisplayDiv = document.getElementById('artist-display');
//     const lyricsDisplayDiv = document.getElementById('lyrics-display');

//     chrome.runtime.sendMessage({ type: 'GET_LYRICS' }, function (response) 
//     {
//         if(response.lyrics) 
//         {
//             lyrics = response.lyrics

//         }
//     })
// }
// )