
import workWithCoordinates from './workWithCoordinates.js';
import { clocks } from './utils/clocks.js';
import * as weather from './weather.js';
import * as api from './apiFunctions.js';
import vars from './variables.js';
import translate from './translate.js';
import init from './map.js';
import createErrorMessage from './error.js';

export default async function getDates() {
  try {
    await api.getCoordinatesAPI();
    workWithCoordinates();
    await api.getWeatherAPI();
    await api.getImageAPI();
    clear();
    ymaps.ready(init);
    weather.addTemperaturesToVariables();
    weather.weatherMarkup();
    translate();
    clocks();
  } catch (e) {
    createErrorMessage(e.message);
    throw new Error(e);
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
