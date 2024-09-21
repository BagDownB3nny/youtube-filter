import { getTime } from "./util";

export const isFilterable = (element, minTime) => {

    timeElement =  element.querySelectorAll('#time-status #text')[0];
    if (!timeElement) {
        return false;
    }
    const timeString = timeElement.innerText;
    const time = getTime(timeString);
    if (time < minTime) {
        const title = element.querySelectorAll('#video-title')[0].ariaLabel;
        console.log(`Removing ${title} with time ${timeString}`)
        return true;
    } else {
        return false;
    }
}
