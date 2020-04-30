/**
 * Thsi is the list of all available addresses. Each of these
 * values will be added to the web page control.
 */
const slks = [
  { value: null, label: 'Отвори ЧЕЗ ГИС Клиент...' },
  { value: 'http://lgapp.pontechrd.local/ArcFMWebViewer412?viewer=ForTest', label: 'Open ForTest' },
  { value: 'http://lgapp.pontechrd.local/ArcFMWebViewer412/', label: 'No Config' },
  { value: 'http://lgapp.pontechrd.local/ArcFMWebViewer412?viewer=ForTest&locale=bg-BG', label: 'Locale bg-BG' },
];

/**
 * Gets current map center coordinates
 * @param {String} [targetEpsgCode='EPSG:4326'] the coordinates are transformed into this
 * projection, by default the map projection is used
 * @param {Number} [precision=6] the number of decimal places for the returned coordinates
 * @returns {Array<Number>} map's center coordinates in form <x,y>
 */
const getCoordinates = (targetEpsgCode = 'EPSG:4326', precision = 6) => {
  const mapView = window.mainMap.OlMapInstance.getView();
  const mapEpsgCode = mapView.getProjection().getCode();
  const mapCenter = mapView.getCenter();
  const coordinates = window.ol.proj.transform(mapCenter, mapEpsgCode, targetEpsgCode);
  return coordinates.map((c) => c.toFixed(precision));
};
/**
 * Gets current map scale
 * @returns {Number} map scale
 */
const getScale = () => {
  const view = window.mainMap.OlMapInstance.getView();
  const projection = view.getProjection();
  const mpu = ol.proj.Units.METERS_PER_UNIT[projection.getUnits()];
  const scale = view.getResolution() * mpu * 39.37 * (25.4 / 0.28);
  return Math.round(scale);
};
/**
 * Format input URL address by adding map's center and scale values
 * @param {!String} url address to be formatted
 * @returns {String} provided URL with added parameters
 */
const formatUrlForSLK = (url) => {
  // by default the coordinates will be send in Geographic coordinates (EPSG:4326)
  const coordinates = getCoordinates();
  const scale = getScale();
  return `${url}${url.indexOf('?') > -1 ? '&' : '?'}center=${coordinates[0]},${coordinates[1]},4326&scale=${scale}`;
};

const createButton = (text) => {
  let button = document.createElement('button');
  button.appendChild(document.createTextNode(text));
  button.style.width = '100px';
  button.style.height = '30px';
  button.style.font = '12px Roboto,Ubuntu';
  button.style.width = '100px';
  button.style.height = '30px';
  button.style.border = '1px solid white';
  button.style.backgroundColor = 'green';
  button.style.color = 'white';

  return button;
};

window.onload = function () {
  const container = document.querySelector('div.map-control.map-control-inner');
  if (container) {
    const item = document.createElement('span');
    item.className = 'mc-controlbox';
    item.style.display = 'inline-flex';

    const buttonCopyCoordinates = createButton('Копирай координатите');
    buttonCopyCoordinates.onclick = () => {
      const coordinates = getCoordinates('EPSG:25835', 0); // UTM35N for ETRS89
      const text = `${coordinates[0]}, ${coordinates[1]}`;
      navigator.clipboard.writeText(text).then(
        () => {
          alert(`Координати ${text} (UTM 35N) бяха копирани в клипборда!`);
        },
        (err) => {
          alert('Грешка: ', err);
        }
      );
    };

    const selectOpenSlk = document.createElement('select');
    selectOpenSlk.id = 'select-slk';
    selectOpenSlk.style.width = '200px';
    selectOpenSlk.onchange = ({ target }) => {
      if (!target) {
        return;
      }
      if (target.value) {
        const url = formatUrlForSLK(target.value);
        console.log(url);
        window.open(url, '_blank');
        target.value = null;
      }
    };

    for (let i = 0; i < slks.length; i++) {
      const option = document.createElement('option');
      option.text = slks[i].label;
      option.value = slks[i].value;
      selectOpenSlk.appendChild(option);
    }

    item.appendChild(buttonCopyCoordinates);
    item.appendChild(selectOpenSlk);

    container.appendChild(item);
  }
};
