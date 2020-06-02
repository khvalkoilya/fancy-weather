import create from './utils/create.js';
import vars from './variables.js';
import celsiusToFahrenheit from './utils/celsToFahr.js';

export function weatherMarkup() {
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
      create('p', 'summary', null, null, ['data-i18n', 'summary']),
      create('p', 'apparent', [create('span', null, null, null, ['data-i18n', 'apparent']), ': ' , create('span', 'temp-feels', `${tempFeels}`)]),
      create('p', 'speed', [create('span', null, null, null, ['data-i18n', 'speed']), create('span', null, `: ${vars.weather.current.wind_speed} M/S`)]),
      create('p', 'humidity', [create('span', null, null, null, ['data-i18n', 'humidity']), create('span', null, `: ${vars.weather.current.humidity} %`)]),    ]),
  ], vars.weatherBlock);
  weatherMarkup3Days();
}

export function changeUnitOfTemperature(unit) {
  let temp = vars.tempC;
  let tempFeels = vars.tempFeelsC;
  let temp3Days = vars.temp3DaysC;
  if (unit === 'F') {
    console.log(vars.tempF);
    temp = vars.tempF;
    tempFeels = vars.tempFeelsF;
    temp3Days = vars.temp3DaysF;
  }
  document.querySelector('.current-temp').innerHTML = temp;
  document.querySelector('.temp-feels').innerHTML = tempFeels;
  document.querySelector('.current-temp').innerHTML = temp;
  document.querySelectorAll('.days-3-temp__temp').forEach((item, index) => {
    const elem = item;
    elem.innerHTML = temp3Days[index].temp;
  });
}

export function addTemperaturesToVariables() {
  vars.tempC = Math.round(vars.weather.current.temp);
  vars.tempFeelsC = Math.round(vars.weather.current.feels_like);
  vars.tempF = celsiusToFahrenheit(vars.tempC);
  vars.tempFeelsF = celsiusToFahrenheit(vars.tempFeelsC);
  let i = 0;
  let j = 0;
  vars.temp3DaysC = vars.temp3DaysC.map(() => {
    i += 1;
    return {
      temp: Math.round(vars.weather.daily[i].temp.day),
      weather: vars.weather.daily[i].weather[0].icon,
    };
  });
  vars.temp3DaysF = vars.temp3DaysF.map(() => {
    j += 1;
    return {
      temp: celsiusToFahrenheit(vars.weather.daily[j].temp.day),
      weather: vars.temp3DaysC[j - 1].weather,
    };
  });
}

export function weatherMarkup3Days() {
  let forecast = vars.temp3DaysC;
  if (vars.unit === 'F') {
    forecast = vars.temp3DaysF;
  }
  console.log(forecast);
  forecast.forEach((item, index) => {
    create('div', `day-${index + 1}`, [
      create('p', 'days-3-day'),
      create('p', 'days-3-temp', [
        create('span', 'days-3-temp__temp', `${item.temp}`),
        create('span', 'weather-small-icon-wrapper', create('img', 'weather-small-icon', null, null, ['src', `https://openweathermap.org/img/wn/${item.weather}@2x.png`])),
      ]),
    ], vars.days3Block);
  });
  vars.days3DayOfWeek = document.querySelectorAll('.days-3-day');
}
