console.log('Livescore Extension is now available!');

/**
 * Finds an HTMLElement cointaning text equal to 'arsenal' in an HTMLElementCollection
 * @param {HTMLElementCollection} [container]
 * @return {HTMLElement} element
 */
findArsenal = container => {
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
highlightElement = element => {
  element.style.backgroundColor = '#f00000';
  element.style.color = 'white';
  element.style.fontWeight = 'bold';
};

/**
 * Searches for any <span> element containing 'arsenal' and highlights it
 */
highlightMatches = () => {
  const spans = document.getElementsByTagName('span');
  const item = findArsenal(spans);
  if (item) {
    highlightElement(item.parentElement.parentElement);
  }
};

/**
 * Highlights FC Arsenal's current position in league table
 */
highlightLeaguePosition = () => {
  const tables = document.getElementsByClassName('league-table');

  if (tables && tables.length > 0) {
    for (let i = 0; i < tables.length; i++) {
      const table = tables.item(i);
      if (table) {
        const teams = table.getElementsByClassName('team');
        const team = findArsenal(teams);
        if (team) {
          highlightElement(team.parentElement);
        }
      }
    }
  }
};

// run above functions and highlight FC Arsenal in the page
highlightMatches();
highlightLeaguePosition();
