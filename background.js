import { fetchSettingsFromStorage } from "./src/storageService";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com/")) {
        fetchSettingsFromStorage();
        chrome.tabs.sendMessage(tabId, {
            type: "HOME",
        });
    }
});