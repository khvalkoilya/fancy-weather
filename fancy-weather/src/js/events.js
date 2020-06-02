import { getImageAPIClick } from './apiFunctions.js';
import vars from './variables.js';
import { getDates } from './initialization.js';
import * as local from './utils/local.js';
import { changeUnitOfTemperature } from './weather.js';
import translate from './translate.js';

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
}

function transitionToChange(index, item, type, func) {
    changeActiveInactive(index, item, type)
    local.set(type, item.innerHTML);
    vars[type] = item.innerHTML;
    func(item.innerHTML);
}

function clickOnInactiveButton(item) {
    vars.activeButtons = document.querySelectorAll('.active-button');
    if (item.classList.contains('unit')) {
        transitionToChange(1, item, 'unit', changeUnitOfTemperature)
    //   changeActiveInactive(1, item, 'unit');
    //   changeUnitOfTemperature(item.innerHTML);
    //   vars.unit = item.innerHTML;
    } else {
        transitionToChange(0, item, 'lang', translate)
    //   changeActiveInactive(0, item, 'lang');
    //   translate(item.innerHTML);
    //   vars.lang = item.innerHTML;
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
    vars.city = value;
    getDates();
  }
}
