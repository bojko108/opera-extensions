console.log('ArcGIS Server SOE Extension is now available!');

const formatOptions = document.getElementById('f');

if (formatOptions != null) {
  const jsonp = document.createElement('option');
  jsonp.text = 'jsonp';
  jsonp.value = 'jsonp';
  formatOptions.add(jsonp);

  console.log('JSONP format was added!');
}
