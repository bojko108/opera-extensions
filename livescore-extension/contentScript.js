console.log(`Livescore Extension is now available!\nHighlights Arsenal FC in the page!`);

const regex = /^["']?arsenal["']?$/gim;

/**
 * Finds an HTMLElement cointaning text equal to 'arsenal' in an HTMLElementCollection
 * @param {HTMLElementCollection} [container]
 * @return {HTMLElement} element
 */
findArsenal = (container) => {
    let result;
    if (container && container.length > 0) {
        for (let i = 0; i < container.length; i++) {
            const item = container.item(i);
            if (item && item.innerText.toLowerCase() === 'arsenal') {
                result = item;
                break;
            }
        }
    }
    return result;
};

/**
 * Highlights an HTMLElement. Changes its background color to Arsenal red, text color to white and makes the font bolder.
 * @param {HTMLElement} element
 */
highlightElement = (element) => {
    element.style.fontWeight = 'bold'
    element.parentElement.parentElement.style.color = 'white'
    element.parentElement.parentElement.style.backgroundColor = '#f00000'
};

/**
 * Highlights FC Arsenal's current position in league table
 */
highlightElements = () => {
    const divs = document.querySelectorAll('div,a')

    if (divs && divs.length > 0) {
        for (let i = 0; i < divs.length; i++) {
            const item = divs.item(i);
            if (item) {
                if (regex.test(item.textContent)) {
                    highlightElement(item);
                }
            }
        }
    }
};

// run above functions and highlight FC Arsenal in the page
highlightElements();