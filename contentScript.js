(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, minTime } = obj;

        console.log(minTime);
        if (type === "HOME") {

            const filterElements = () => {
                console.log("looking for elements")
                const recommendationElements = document.querySelectorAll('#dismissible');
                recommendationElements.forEach((element) => {
                    if (isFilterable(element, minTime)) {
                        element.remove();
                    }
                });
            };
         
            // Run the function when the page loads
            filterElements();

            const observer = new MutationObserver((mutationsList, observer) => {
                // Look through all mutations that just occured
                for(let mutation of mutationsList) {
                    // If the addedNodes property has one or more nodes
                    if(mutation.addedNodes.length) {
                        for (let node of mutation.addedNodes) {
                            if (node.nodeType === Node.ELEMENT_NODE && node.id === 'dismissible') {
                                waitForTimeElementToExist(node).then(() => {
                                    if (isFilterable(node, minTime)) {
                                        node.remove();
                                    }
                                });
                            }
                        }
                    }
                }
            });

            // Start observing the target node with the configured parameters
            observer.observe(document.body, { childList: true, subtree: true });
        }
    });
})();

function isFilterable(element, minTime) {

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


function waitForTimeElementToExist(node) {
    return new Promise(resolve => {
        if (node.querySelector("#time-status #text")) {
            return resolve();
        }
        const observer = new MutationObserver(() => {
            if (node.querySelector("#time-status #text")) {
                resolve();
                observer.disconnect();
            }
        });
        observer.observe(node, {
            subtree: true,
            childList: true,
        });
    });
}