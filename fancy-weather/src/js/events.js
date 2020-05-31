import { getImageAPIClick } from './apiFunctions.js';
import vars from './variables.js';
import { getDates } from './initialization.js';

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
    //   vars.input.setAttribute('placeholder', value);
    //   vars.word = value;
    //   vars.page = 1;
    //   getMovieData();
  }
}
