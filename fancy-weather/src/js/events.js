import { getImageAPIClick, getCoordinatesAPI, getWeatherAPI } from './apiFunctions.js';
import vars from './variables.js';
import getDates from './initialization.js';
import * as local from './utils/local.js';
import { changeUnitOfTemperature } from './weather.js';
import translate from './translate.js';

import workWithCoordinates from './workWithCoordinates.js';

removeInactive(vars.langButtons, vars.lang);
removeInactive(vars.tempButtons, vars.unit);

function removeInactive(collection, type) {
  Array.from(collection).forEach((elem) => {
    if (type.toUpperCase() === elem.innerHTML) {
      elem.classList.remove('inactive-button');
      elem.classList.add('active-button');
    }
  });
}

function changeActiveInactive(index, item) {
  vars.activeButtons[index].classList.add('inactive-button');
  vars.activeButtons[index].classList.remove('active-button');
  item.classList.remove('inactive-button');
  item.classList.add('active-button');
}

async function transitionToChange(index, item, type) {
  changeActiveInactive(index, item);
  local.set(type, item.innerHTML);
  vars[type] = item.innerHTML;
}

async function clickOnInactiveButton(item) {
  vars.activeButtons = document.querySelectorAll('.active-button');
  if (item.classList.contains('unit')) {
    transitionToChange(1, item, 'unit', changeUnitOfTemperature);
    changeUnitOfTemperature(item.innerHTML);
  } else {
    transitionToChange(0, item, 'lang');
    await getCoordinatesAPI();
    workWithCoordinates();
    await getWeatherAPI();
    translate();
  }
  vars.inactiveButtons = document.querySelectorAll('.inactive-button');
}

function inactiveButtonsFunction(item) {
  item.addEventListener('click', () => clickOnInactiveButton(item));
}

vars.inactiveButtons.forEach((item) => inactiveButtonsFunction(item));

document.querySelector('.repeat-button').addEventListener('click', () => getImageAPIClick());
vars.submit.addEventListener('click', () => searchFunction());

vars.input.addEventListener('keydown', (el) => {
  if (el.keyCode === 13) {
    searchFunction();
  }
});

function searchFunction() {
  const { value } = vars.input;
  vars.input.value = '';
  if (value.length !== 0) {
    vars.previousCity = vars.city;
    vars.city = value;
    getDates();
  }
}
