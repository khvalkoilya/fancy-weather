import vars from './variables.js';

export async function getImageAPI() {
  const img = new Image();
  const image = await getAPIDate(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${vars.weather.current.weather[0].main}&client_id=7UB2yTJJmRIoR757A7aooFohbAZI4MTLdz7uPjtdVGs`);
  img.src = image.urls.regular;
  img.onload = function () {
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgb(0, 0, 0)), url(${img.src})`;
  };
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

async function getAPIDate(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getCoordinatesAPI() {
  vars.coordinatesObject = await getAPIDate(`https://api.opencagedata.com/geocode/v1/json?q=${vars.city}&key=3d0e9d59f264428eb45050c8162e5dce&pretty=1&language=${vars.lang}&no_annotations=1`);
}

export async function getWeatherAPI() {
  vars.weather = await getAPIDate(`https://api.openweathermap.org/data/2.5/onecall?lat=${vars.coordinates.lat}&lon=${vars.coordinates.lng}&lang=${vars.lang}&units=metric&appid=d419874a64a54466ad82bdcb712a2a83`);
  console.log(vars.weather);
}
