import vars from './variables.js';
import { getTime } from './utils/clocks.js';

export async function getImageAPI() {
  vars.offset = vars.weather.timezone_offset;
  vars.time = getTime();
  const month = (vars.time.getMonth() + 1) / 3;
  const season = vars.season[Math.floor(month % 4)];
  const dailyTime = vars.dailyTime[Math.floor(vars.time.getHours() / 6)];
  const img = new Image();
  try {
    const image = await getAPIDate(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${dailyTime} ${season} ${vars.weather.current.weather[0].main}&client_id=7UB2yTJJmRIoR757A7aooFohbAZI4MTLdz7uPjtdVGs`);
    img.src = image.urls.regular;
    img.onload = () => {
      document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgb(0, 0, 0)), url(${img.src})`;
    //   document.body.style.backgroundImage = `url(${img.src})`
    };
    console.log(`Search image by: ${dailyTime} ${season} ${vars.weather.current.weather[0].main}`);
  } catch (e) {
    console.log(e.message);
  }
}

export async function getImageAPIClick() {
  await getImageAPI();
  document.querySelector('.change').classList.add('change-active');
  setTimeout(() => {
    document.querySelector('.change').classList.remove('change-active');
  }, 1000);
}


export async function getMyPositionAPI() {
  const myPosition = await getAPIDate('https://ipinfo.io/json?token=d14409aeca033b');
  vars.city = myPosition.city;
}

export async function getAPIDate(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getCoordinatesAPI() {
  vars.coordinatesObject = await getAPIDate(`https://api.opencagedata.com/geocode/v1/json?q=${vars.city}&key=3d0e9d59f264428eb45050c8162e5dce&pretty=1&language=${vars.lang.toLowerCase()}&no_annotations=1`);
}


export async function getWeatherAPI() {
  vars.weather = await getAPIDate(`https://api.openweathermap.org/data/2.5/onecall?lat=${vars.coordinates.lat}&lon=${vars.coordinates.lng}&lang=${vars.lang}&units=metric&appid=d419874a64a54466ad82bdcb712a2a83`);
  console.log(vars.weather);
}
