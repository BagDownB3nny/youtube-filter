export const getTime = (time) => {
    const timeArr = time.split(':');
    const seconds = timeArr[timeArr.length - 1];
    const minutes = timeArr[timeArr.length - 2];
    const hours = timeArr[timeArr.length - 3];
    let timeInSeconds = 0;
    if (seconds) {
        timeInSeconds += parseInt(seconds);
    }
    if (minutes) {
        timeInSeconds += parseInt(minutes) * 60;
    }
    if (hours) {
        timeInSeconds += parseInt(hours) * 3600;
    }
    return timeInSeconds;
}