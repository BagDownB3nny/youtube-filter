import { fetchSettingsFromStorage, setMinTime, getMinTime } from './src/storageService.js';

document.addEventListener('DOMContentLoaded', async (event) => {
    await fetchSettingsFromStorage();
    const  { minutes, seconds } = getMinTime();
    console.log(getMinTime());
    console.log(minutes, seconds);
    document.getElementById('minutesInput').value = minutes || 3;
    document.getElementById('secondsInput').value = seconds || 0;
    document.getElementById('saveButton').addEventListener('click', async () => {
        const minTime = calculateTotalTime();
        await setMinTime(minTime);
    });
}); 

function calculateTotalTime() {
    const minutes = document.getElementById('minutesInput').value;
    const seconds = document.getElementById('secondsInput').value;
    const totalTimeInSeconds = minutes * 60 + parseInt(seconds);
    return totalTimeInSeconds;
}