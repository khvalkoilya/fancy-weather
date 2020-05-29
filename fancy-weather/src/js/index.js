import vars from './variables.js';
import create from './utils/create.js';
import * as local from './utils/local.js';

getStartDates();

async function getStartDates() {
  await getMyPositionAPI();
  ymaps.ready(init);
  await getWeatherAPI();
}

async function getWeatherAPI() {
  const weather = await getAPIDate(`https://api.openweathermap.org/data/2.5/onecall?lat=${vars.coordinates[0]}&lon=${vars.coordinates[1]}&lang=${vars.lang}&units=metric&appid=d419874a64a54466ad82bdcb712a2a83`);
  console.log(weather);
  addTemperaturesToVariables(weather);
  weatherMarkup(weather);
}

function celsiusToFahrenheit(temp) {
  return Math.round(temp * 1.8 + 32);
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
    create('div', 'weather-icon-wrapper', create('img', 'weather-icon', null, null, ['src', `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`])),
    create('p', 'summary', weather.current.weather[0].description.toUpperCase()),
    create('p', 'apparent', `FEELS LIKE: ${tempFeels}`),
    create('p', 'speed', `WIND: ${weather.current.wind_speed} M/S`),
    create('p', 'humidity', `HUMIDITY: ${weather.current.humidity} %`),
  ], vars.weatherBlock);
  weatherMarkup3Days(weather);
}

function addTemperaturesToVariables(weather) {
  vars.tempC = Math.round(weather.current.temp);
  vars.tempFeelsC = Math.round(weather.current.feels_like);
  vars.tempF = celsiusToFahrenheit(vars.temp);
  vars.tempFeelsF = celsiusToFahrenheit(vars.tempFeelsC);
  let i = 0;
  let j = 0;
  vars.temp3DaysC = vars.temp3DaysC.map(() => {
    i += 1;
    return { 
        temp: Math.round(weather.daily[i].temp.day),
        weather: weather.daily[i].weather[0].icon       
    }
  });
  vars.temp3DaysF = vars.temp3DaysF.map(() => {
    j += 1;
    return {
        temp: celsiusToFahrenheit(weather.daily[j].temp.day),
        weather: vars.temp3DaysC[j-1].weather
    }
  });
}

function weatherMarkup3Days(weather) {
    let temp = vars.temp3DaysC;
    if (vars.unit === 'F') {
        temp = vars.temp3DaysF;
    }
}

async function getMyPositionAPI() {
  const myPosition = await getAPIDate('https://ipinfo.io/json?token=d14409aeca033b');
  vars.coordinates = myPosition.loc.split(',').map((item) => Number(item));
}
async function getAPIDate(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

document.querySelector('.repeat-button').addEventListener('click', () => getImageAPI());


async function getImageAPI() {
  const image = await getAPIDate('https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=7UB2yTJJmRIoR757A7aooFohbAZI4MTLdz7uPjtdVGs');
  document.body.style.background = `center / cover url(${image.urls.regular}) no-repeat`;
  document.querySelector('.change').classList.add('change-active');
  setTimeout(() => {
    document.querySelector('.change').classList.remove('change-active');
  }, 1000);
}

function init() {
  const myMap = new ymaps.Map('map', {
    center: vars.coordinates,
    zoom: 7,
    controls: [],
  });
  myMap.controls.add('zoomControl');
}
