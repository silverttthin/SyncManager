document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        document.getElementById('loading').textContent = 'No active tab found.';
        return;
      }
      
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: getNowPlaying
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            const { song, artist } = results[0].result;
            document.getElementById('song').textContent = song;
            document.getElementById('artist').textContent = artist;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').style.display = 'block';
          } else {
            document.getElementById('loading').textContent = 'No song playing or unable to fetch data.';
          }
        }
      );
    });
  });
  
  function getNowPlaying() {
    const artistElement = document.querySelector('[data-testid="context-item-info-subtitles"] a');
    const songElement = document.querySelector('[data-testid="context-item-info-title"] a');
    
    const artistName = artistElement ? artistElement.textContent : null;
    const songTitle = songElement ? songElement.textContent : null;
    
    return { song: songTitle, artist: artistName };
  }
  