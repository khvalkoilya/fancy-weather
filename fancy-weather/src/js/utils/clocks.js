import vars from '../variables.js';

export function clocks() {
  showTime();
  setInterval(() => {
    showTime();
  }, 1000);
}

function showTime() {
  const time = getTime();
  const date = time.getDate();
  const day = vars.dayShort[time.getDay()];
  const month = vars.month[time.getMonth()];
  let h = time.getHours().toString();
  let m = time.getMinutes().toString();
  let s = time.getSeconds().toString();
  if (h.length < 2) {
    h = `0${h}`;
  }
  if (m.length < 2) {
    m = `0${m}`;
  }
  if (s.length < 2) {
    s = `0${s}`;
  }
  vars.todayDateBlock.innerHTML = `${day} &nbsp;${date} &nbsp;${month} &nbsp;<span class="time">${h}:${m}:${s}</span>`;
  dateFor3Days(time);
}

function dateFor3Days(time) {
  let day = time.getDay() + 1;
  Array.from(vars.days3DayOfWeek).forEach((item) => {
    const element = item;
    if (day > 6) {
      day -= 7;
    }
    element.innerHTML = vars.dayFull[day];
    day += 1;
  });
}

export function getTime() {
  const myDate = new Date();
  const differense = myDate.getTimezoneOffset() * 60000;
  const offset = vars.offset * 1000;
  const time = new Date(Date.parse(myDate) + differense + offset);
  return time;
}
