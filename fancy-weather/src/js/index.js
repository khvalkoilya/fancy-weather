import vars from './variables.js';
// import * as local from './utils/local.js';
import * as api from './apiFunctions.js';
import createErrorMessage from './error.js';
import './events.js';
import getDates from './initialization.js';


start();

async function start() {
  try {
    await api.getMyPositionAPI();
    await getDates();
    vars.wrappers.forEach((item) => item.classList.remove('none'));
  } catch (e) {
    createErrorMessage(e.message);
  }
}
