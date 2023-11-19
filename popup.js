// Save minTime to chrome storage when save button is clicked
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('saveButton').addEventListener('click', () => {
        const minTime = calculateTotalTime();
        chrome.storage.sync.set({minTime: minTime}, function() {
            console.log('minTime is set to ' + minTime);
        });
    });
}); 

function calculateTotalTime() {
    const minutes = document.getElementById('minutesInput').value;
    const seconds = document.getElementById('secondsInput').value;
    const totalTimeInSeconds = minutes * 60 + parseInt(seconds);
    return totalTimeInSeconds;
}
 
// Get minTime from chrome storage, and display in the input box
chrome.storage.sync.get(['minTime'], function(result) {
    const minutes = Math.floor(result.minTime / 60);
    const seconds = result.minTime % 60;
    document.getElementById('minutesInput').value = minutes || 3;
    document.getElementById('secondsInput').value = seconds || 0;
}); 