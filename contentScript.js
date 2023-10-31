(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value } = obj;

        if (type === "HOME") {
            const observer = new MutationObserver((mutationsList, observer) => {
                // Look through all mutations that just occured
                for(let mutation of mutationsList) {
                    // If the addedNodes property has one or more nodes
                    if(mutation.addedNodes.length) {
                        let recommendationElements = document.querySelectorAll('#dismissible');
                        recommendationElements.forEach((element) => {
                            if (isFilterable(element)) {
                                console.log(element);
                                element.remove();
                            }
                        });
                    }
                }
            });

            // Start observing the target node with the configured parameters
            observer.observe(document.body, { childList: true, subtree: true });
        }
    });
})();

function isFilterable(element) {
    const minTime = 180;

    timeElement =  element.querySelectorAll('#time-status #text')[0];
    if (!timeElement) {
        return false;
    }
    const timeString = timeElement.innerText;
    const time = getTime(timeString);
    if (time < minTime) {
        const title = element.querySelectorAll('#video-title-link')[0].ariaLabel;
        console.log(timeString, time, title);
        return true;
    } else {
        return false;
    }
}

function getTime(time) {
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
