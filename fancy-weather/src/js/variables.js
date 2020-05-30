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
  dayShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],


  clockBlock: document.querySelector('.time'),
  todayDateBlock: document.querySelector('.date'),
  days3DayOfWeek: '',
};
