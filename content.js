function getCurrentTime() {
    const timeElement = document.querySelector('ytmusic-player-bar .time-info');

    if (timeElement) {
        const currentTime = timeElement.textContent;
        document.getElementById('time-display').textContent = currentTime;
    } else {
        console.log('Time element not found.');
    }
}

// 투명한 탭을 생성하여 화면에 추가
const timeDisplayDiv = document.createElement('div');
timeDisplayDiv.id = 'time-display';
timeDisplayDiv.style.position = 'fixed';
timeDisplayDiv.style.bottom = '10px';
timeDisplayDiv.style.right = '10px';
timeDisplayDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
timeDisplayDiv.style.color = 'white';
timeDisplayDiv.style.padding = '10px';
timeDisplayDiv.style.borderRadius = '5px';
timeDisplayDiv.style.zIndex = '1000';
document.body.appendChild(timeDisplayDiv);

// 0.1초마다 현재 재생 시각을 가져오는 함수 호출
setInterval(getCurrentTime, 100);