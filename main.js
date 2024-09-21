import { isFilterable } from "./src/filterService";
import { settings } from "./src/storageService";

(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value } = obj;
        const minTime = settings.minTime;

        console.log(minTime);
        if (type === "HOME") {

            const filterInitialElements = () => {
                console.log("looking for elements")
                const recommendationElements = document.querySelectorAll('#dismissible');
                recommendationElements.forEach((element) => {
                    if (isFilterable(element, minTime)) {
                        console.log("Removed during initial load");
                        element.remove();
                    }
                });
            };
         

            // Run the function after a 2 second delay


            setTimeout(filterInitialElements, 2000);
            setTimeout(filterInitialElements, 3000);
            setTimeout(filterInitialElements, 4000);
            setTimeout(filterInitialElements, 5000);
            setTimeout(filterInitialElements, 6000);
            setTimeout(filterInitialElements, 7000);
            setTimeout(filterInitialElements, 8000);

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