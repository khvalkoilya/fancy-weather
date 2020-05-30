import vars from './variables.js';
// import * as local from './utils/local.js';
import clocks from './utils/clocks.js';
import * as weather from './weather.js';
import * as api from './apiFunctions.js';
import './events.js';

start();

async function start() {
    await api.getMyPositionAPI();
    const trying = await getDates();
    if(trying === undefined) {
      vars.wrappers.forEach((item) => item.classList.remove('none'));
    } else {
      console.log(trying);
    }
}

async function getDates() {
  try {
    await api.getCoordinatesAPI();
    await api.getWeatherAPI();
    await api.getImageAPI();
    ymaps.ready(init);
    weather.addTemperaturesToVariables();
    weather.weatherMarkup();
    clocks();
  } catch(e) {
    return e.message
  }
}

function init() {
  const myMap = new ymaps.Map('map', {
    center: [vars.coordinates.lat, vars.coordinates.lng],
    zoom: 7,
    controls: [],
  });
  myMap.controls.add('zoomControl');
}
