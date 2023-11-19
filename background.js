chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com/")) {
        chrome.storage.sync.get(['minTime'], function(result) {
            const minTime = result.minTime || 180;
            chrome.tabs.sendMessage(tabId, {
                type: "HOME",
                minTime: minTime
            });
        });
    }
});