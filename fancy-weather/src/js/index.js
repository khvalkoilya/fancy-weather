import vars from './variables.js';
import create from './utils/create.js';
import * as local from './utils/local.js';

getStartDates();

async function getStartDates() {
  await getMyPositionAPI();
  console.log(vars.coordinates);
  ymaps.ready(init);
  await getWeatherAPI();
}

async function getWeatherAPI() {
  const weather = await getAPIDate(`https://api.openweathermap.org/data/2.5/onecall?lat=${vars.coordinates[0]}&lon=${vars.coordinates[1]}&lang=${vars.lang}&units=metric&appid=d419874a64a54466ad82bdcb712a2a83`);
  console.log(weather);
  vars.tempC = weather.current.temp;
  vars.tempFeelsC = weather.current.feels_like;
  vars.tempF = Math.round(vars.temp * 1.8 + 32);
  vars.tempFeelsF = Math.round(vars.tempFeelsC * 1.8 + 32);
  weatherMarkup(weather);
}

function weatherMarkup(weather) {
  let temp = vars.tempC;
  let tempFeels = vars.tempFeelsC;
  if (vars.unit === 'F') {
    temp = vars.tempF;
    tempFeels = vars.tempFeelsF;
  }
  create('p', 'current-temp', `${temp}`, vars.weatherBlock);
  create('div', 'current-weather-info', [
    create('p', 'summary', weather.current.weather[0].description.toUpperCase()),
    create('p', 'apparent', `FEELS LIKE: ${tempFeels}`),
    create('p', 'speed', `WIND: ${weather.current.wind_speed} M/S`),
    create('p', 'humidity', `HUMIDITY: ${weather.current.humidity} %`),
  ], vars.weatherBlock);
}

async function getMyPositionAPI() {
  const myPosition = await getAPIDate('https://ipinfo.io/json?token=d14409aeca033b');
  vars.coordinates = myPosition.loc.split(',').map(item => Number(item));
}
async function getAPIDate(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}


// async function getImageAPI() {
//   const url = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=7UB2yTJJmRIoR757A7aooFohbAZI4MTLdz7uPjtdVGs';
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }
// getImageAPI();
// //
// // get Coordinates
// async function getCoordinatesAPI() {
//   const url = 'https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=3d0e9d59f264428eb45050c8162e5dce&pretty=1&no_annotations=1';
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }
// getCoordinatesAPI();
// //
// // get Map
function init() {
  const myMap = new ymaps.Map('map', {
    center: vars.coordinates,
    zoom: 7,
    controls: [],
  });
  myMap.controls.add('zoomControl');
}
// //
