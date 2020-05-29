import * as local from './utils/local.js';

export default {
  coordinates: '',
  unit: local.get('temperature', 'C'),
  lang: local.get('lang', 'en'),
  tempC: 0,
  tempFeelsC: 0,
  tempF: 0,
  tempFeelsF: 0,
  weatherBlock: document.querySelector('.weather-info'),
  temp3DaysC: [0, 0, 0],
  temp3DaysF: [0, 0, 0],
};
