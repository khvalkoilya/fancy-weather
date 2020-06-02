import vars from './variables.js';
import language from './translation/collector.js';

export default function translate() {
  const words = language[vars.lang.toLowerCase()];
  vars.dayFull = words.dayFull;
  vars.dayShort = words.dayShort;
  vars.month = words.month;
  vars.elementsToTranslate = document.querySelectorAll('[data-i18n]');
  vars.elementsToTranslate.forEach((element) => {
    element.innerHTML = words[element.dataset.i18n];
  });
}
