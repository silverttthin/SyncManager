document.addEventListener('DOMContentLoaded', function() {
    function updateDisplay() {
        chrome.storage.local.get(['title', 'currentTime'], function(data) {
            const timeDisplayDiv = document.getElementById('time-display');
            if (data.title && data.currentTime) {
                timeDisplayDiv.textContent = `${data.title} - ${data.currentTime}`;
            } else {
                timeDisplayDiv.textContent = '정보를 가져오는 중...';
            }
        });
    }

    updateDisplay();
    setInterval(updateDisplay, 1000);
});