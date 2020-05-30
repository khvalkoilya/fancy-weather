import vars from './variables.js';
import create from './utils/create.js';
import * as local from './utils/local.js';

getStartDates();

async function getStartDates() {
  await getMyPositionAPI();
  await getWeatherAPI();
  await getImageAPI();
  ymaps.ready(init);
  addTemperaturesToVariables();
  weatherMarkup();
}

async function getWeatherAPI() {
  vars.weather = await getAPIDate(`https://api.openweathermap.org/data/2.5/onecall?lat=${vars.coordinates[0]}&lon=${vars.coordinates[1]}&lang=${vars.lang}&units=metric&appid=d419874a64a54466ad82bdcb712a2a83`);
  console.log(vars.weather);
}

function celsiusToFahrenheit(temp) {
  return Math.round(temp * 1.8 + 32);
}

function weatherMarkup() {
  let temp = vars.tempC;
  let tempFeels = vars.tempFeelsC;
  if (vars.unit === 'F') {
    temp = vars.tempF;
    tempFeels = vars.tempFeelsF;
  }
  create('p', 'current-temp', `${temp}`, vars.weatherBlock);
  create('div', 'current-weather-info', [
    create('div', 'weather-icon-wrapper', create('img', 'weather-icon', null, null, ['src', `https://openweathermap.org/img/wn/${vars.weather.current.weather[0].icon}@2x.png`])),
    create('div', 'current-weather-info__text', [
      create('p', 'summary', vars.weather.current.weather[0].description.toUpperCase()),
      create('p', 'apparent', `FEELS LIKE: ${tempFeels}`),
      create('p', 'speed', `WIND: ${vars.weather.current.wind_speed} M/S`),
      create('p', 'humidity', `HUMIDITY: ${vars.weather.current.humidity} %`)
    ])
  ], vars.weatherBlock);
  weatherMarkup3Days();
}

function addTemperaturesToVariables() {
  vars.tempC = Math.round(vars.weather.current.temp);
  vars.tempFeelsC = Math.round(vars.weather.current.feels_like);
  vars.tempF = celsiusToFahrenheit(vars.temp);
  vars.tempFeelsF = celsiusToFahrenheit(vars.tempFeelsC);
  let i = 0;
  let j = 0;
  vars.temp3DaysC = vars.temp3DaysC.map(() => {
    i += 1;
    return { 
        temp: Math.round(vars.weather.daily[i].temp.day),
        weather: vars.weather.daily[i].weather[0].icon       
    }
  });
  vars.temp3DaysF = vars.temp3DaysF.map(() => {
    j += 1;
    return {
        temp: celsiusToFahrenheit(vars.weather.daily[j].temp.day),
        weather: vars.temp3DaysC[j-1].weather[0].icon
    }
  });
}

function weatherMarkup3Days() {
    let forecast = vars.temp3DaysC;
    if (vars.unit === 'F') {
        forecast = vars.temp3DaysF;
    }
    console.log(forecast)
    forecast.forEach((item, index) => {
      create('div', `${index + 1}-day`, [
        create('p', 'days-3-day', 'MONDAY'),
        create('p', 'days-3-temp', [
          `${item.temp}`,
          create('span', 'weather-small-icon-wrapper', create('img', 'weather-small-icon', null, null, ['src', `https://openweathermap.org/img/wn/${item.weather}@2x.png`])),
          ])
        ], vars.days3Block);
    })
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

document.querySelector('.repeat-button').addEventListener('click', () => getImageAPIClick());

async function getImageAPIClick() {
  await getImageAPI();
  document.querySelector('.change').classList.add('change-active');
  setTimeout(() => {
    document.querySelector('.change').classList.remove('change-active');
  }, 1000);
}

async function getImageAPI() {
  let img = new Image();
  const image = await getAPIDate(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${vars.weather.current.weather[0].main}&client_id=7UB2yTJJmRIoR757A7aooFohbAZI4MTLdz7uPjtdVGs`);
  img.src = image.urls.regular;
  img.onload = function () {
    document.body.style.background = `center / cover url(${img.src}) no-repeat`;
  }
}

function init() {
  const myMap = new ymaps.Map('map', {
    center: vars.coordinates,
    zoom: 7,
    controls: [],
  });
  myMap.controls.add('zoomControl');
}
