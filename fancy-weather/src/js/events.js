import { getImageAPIClick } from './apiFunctions.js';
import vars from './variables.js';
import { getDates } from './initialization.js';
import * as local from './utils/local.js';
import { changeUnitOfTemperature } from './weather.js';

removeInactive(vars.langButtons, vars.lang);
removeInactive(vars.tempButtons, vars.unit);
// vars.activeButtons = document.querySelectorAll('.active-button');

function removeInactive(collection, type) {
  Array.from(collection).forEach((elem) => {
    if (type.toUpperCase() === elem.innerHTML) {
      elem.classList.remove('inactive-button');
      elem.classList.add('active-button');
    }
  });
}

function changeActiveInactive(index, item, type) {
  vars.activeButtons[index].classList.add('inactive-button');
  vars.activeButtons[index].classList.remove('active-button');
  item.classList.remove('inactive-button');
  item.classList.add('active-button');
  local.set(type, item.innerHTML);
}

vars.inactiveButtons.forEach((item) => {
  item.addEventListener('click', () => {
    vars.activeButtons = document.querySelectorAll('.active-button');
    if (item.classList.contains('unit')) {
      changeActiveInactive(1, item, 'unit');
      changeUnitOfTemperature(item.innerHTML);
      vars.unit = item.innerHTML;
    } else {
      changeActiveInactive(0, item, 'lang');
      vars.lang = item.innerHTML;
    }
    vars.inactiveButtons = document.querySelectorAll('.inactive-button');
  });
});

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
    vars.city = value;
    getDates();
  }
}
