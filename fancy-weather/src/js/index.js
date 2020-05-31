import vars from './variables.js';
// import * as local from './utils/local.js';
import * as api from './apiFunctions.js';
import './events.js';
import * as init from './initialization.js';

start();

async function start() {
  await api.getMyPositionAPI();
  const trying = await init.getDates();
  if (trying === true) {
    vars.wrappers.forEach((item) => item.classList.remove('none'));
  } else {
    console.log(trying);
  }
}
