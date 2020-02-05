console.log('Kindergarden Extension is now available!');

const ourKids = ['18007680'];

/**
 * Finds an HTMLElement cointaning text equal to 'id' in an HTMLElementCollection
 * @param {HTMLElementCollection} [container]
 * @return {HTMLElement} element
 */
findKid = container => {
  let result;
  if (container && container.length > 0) {
    for (let i = 0; i < container.length; i++) {
      const item = container.item(i);
      if (item && ourKids.findIndex(v => item.innerText.indexOf(v) > -1) > -1 && item.innerText.length < 100) {
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
highlightElement = element => {
  element.style.backgroundColor = '#f00000';
  element.style.color = 'white';
  element.style.fontWeight = 'bold';
};

/**
 * Highlights our kids in the lists
 */
highlightOurKids = () => {
  const tables = document.getElementsByTagName('table');
  for (let i = 0; i < tables.length; i++) {
    const kids = tables[i].children[0].children;
    const kid = findKid(kids);
    console.log(kid);
    if (kid) {
      highlightElement(kid);
    }
  }
};

highlightOurKids();
