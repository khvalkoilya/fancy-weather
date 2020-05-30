import * as local from './utils/local.js';

export default {
  coordinates: {},
  unit: local.get('temperature', 'C'),
  lang: local.get('lang', 'en'),
  wrappers: document.querySelectorAll('.wrapper'),
  city: '',
  country: '',
  offset: 0,
  weather: {},
  tempC: 0,
  tempFeelsC: 0,
  tempF: 0,
  tempFeelsF: 0,
  weatherBlock: document.querySelector('.weather-info'),
  days3Block: document.querySelector('.weather-3days'),
  temp3DaysC: [0, 0, 0],
  temp3DaysF: [0, 0, 0],
  clockHTML: document.querySelector('.time'),
  dayShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
