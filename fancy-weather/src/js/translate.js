import vars from './variables.js';
import language from './translation/collector.js';

export default function translate() {
  const words = language[vars.lang.toLowerCase()];
  vars.dayFull = words.dayFull;
  vars.dayShort = words.dayShort;
  vars.month = words.month;
  words.city = `${vars.city.toUpperCase()}, ${vars.country.toUpperCase()}`;
  words.summary = vars.weather.current.weather[0].description.toUpperCase();
  vars.elementsToTranslate = document.querySelectorAll('[data-i18n]');
  vars.elementsToTranslate.forEach((element) => {
    const el = element;
    el.innerHTML = words[element.dataset.i18n];
  });

  vars.input.setAttribute('placeholder', words.search);
  // vars.weather.current.weather[0].description.toUpperCase()
}
