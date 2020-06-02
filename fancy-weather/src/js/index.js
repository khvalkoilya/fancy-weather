import vars from './variables.js';
// import * as local from './utils/local.js';
import * as api from './apiFunctions.js';
import './events.js';
import * as init from './initialization.js';
import translate from './translate.js';

translate();
start();

async function start() {
  try {
    await api.getMyPositionAPI();
    await init.getDates();
    vars.wrappers.forEach((item) => item.classList.remove('none'));
  } catch (e) {
    alert('qe');
  }
}
