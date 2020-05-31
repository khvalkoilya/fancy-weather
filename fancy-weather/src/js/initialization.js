
import workWithCoordinates from './workWithCoordinates.js';
import { clocks } from './utils/clocks.js';
import * as weather from './weather.js';
import * as api from './apiFunctions.js';
import vars from './variables.js';

export async function getDates() {
  try {
    await api.getCoordinatesAPI();
    workWithCoordinates();
    await api.getWeatherAPI();
    await api.getImageAPI();
    clear();
    ymaps.ready(init);
    weather.addTemperaturesToVariables();
    weather.weatherMarkup();
    clocks();
  } catch (e) {
    console.log(e.message);
  }

  return true;
}

function clear() {
  vars.weatherBlock.innerHTML = '';
  vars.days3Block.innerHTML = '';
  vars.cityBlock.innerHTML = '';
  vars.todayDateBlock.innerHTML = '';
  vars.map.innerHTML = '';
}

export function init() {
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
