chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com/")) {
        console.log("INCLUDES");
        chrome.tabs.sendMessage(tabId, {
            type: "HOME"
        });
    }
  });