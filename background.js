chrome.action.onClicked.addListener((tab) => {
    chrome.windows.getCurrent((currentWindow) => {
        const width = 300;
        const height = 100;
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'UPDATE_POPUP') {
        chrome.storage.local.set({
            title: request.title,
            currentTime: request.currentTime
        });
    }
});