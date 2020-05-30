import vars from './variables.js';
// import * as local from './utils/local.js';
import clocks from './utils/clocks.js';
import * as weather from './weather.js';
import * as api from './apiFunctions.js';
import './events.js';
import workWithCoordinates from './workWithCoordinates.js';

start();

async function start() {
  await api.getMyPositionAPI();
  const trying = await getDates();
  if (trying === true) {
    vars.wrappers.forEach((item) => item.classList.remove('none'));
  } else {
    console.log(trying);
  }
}

async function getDates() {
  try {
    await api.getCoordinatesAPI();
    workWithCoordinates();
    await api.getWeatherAPI();
    await api.getImageAPI();
    ymaps.ready(init);
    weather.addTemperaturesToVariables();
    weather.weatherMarkup();
    clocks();
  } catch (e) {
    return e.message;
  }
  return true;
}

function init() {
  const myMap = new ymaps.Map('map', {
    center: [vars.coordinates.lat, vars.coordinates.lng],
    zoom: 7,
    controls: [],
  });
  myMap.controls.add('zoomControl');
  myMap.geoObjects
    .add(new ymaps.Placemark([vars.coordinates.lat, vars.coordinates.lng], {
      balloonContent: `${vars.city}`,
    }, {
      iconColor: 'rgba(65,53,45, 0.8)',
    }));
}
