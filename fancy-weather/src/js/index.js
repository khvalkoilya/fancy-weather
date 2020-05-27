import '../assets/styles/style.css';
import * as vars from './variables.js';
// getStartDates();

// async function getStartDates() {
//     const myPosition = await getAPIDate('https://ipinfo.io/json?token=d14409aeca033b');
//     console.log(myPosition);
//     const coordinates = await getAPIDate(`https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=3d0e9d59f264428eb45050c8162e5dce&pretty=1&language=be&no_annotations=1`)
//     console.log(coordinates);
//     const weather = await getAPIDate(`https://api.openweathermap.org/data/2.5/onecall?lat=53.9000&lon=27.5667&units=metric&appid=d419874a64a54466ad82bdcb712a2a83`)
//     console.log(weather);
// }

async function getAPIDate(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

// get My position
// async function getMyPositionAPI() {
//   const url = 'https://ipinfo.io/json?token=d14409aeca033b';
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }
// getMyPositionAPI();
//
// // get Weather
// async function getWeatherAPI() {
//   const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=53.9000&lon=27.5667&units=metric&appid=d419874a64a54466ad82bdcb712a2a83';
//   // 0 - current, 1 - tomorrow...
//   // image https://openweathermap.org/img/wn/${icon}.png
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }
// getWeatherAPI();
// //
// // get Image
// async function getImageAPI() {
//   const url = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=7UB2yTJJmRIoR757A7aooFohbAZI4MTLdz7uPjtdVGs';
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }
// getImageAPI();
// //
// // get Coordinates
// async function getCoordinatesAPI() {
//   const url = 'https://api.opencagedata.com/geocode/v1/json?q=Minsk&key=3d0e9d59f264428eb45050c8162e5dce&pretty=1&no_annotations=1';
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }
// getCoordinatesAPI();
// //
// // get Map
// ymaps.ready(init);
// function init() {
//   const myMap = new ymaps.Map('map', {
//     center: [55.76, 37.64],
//     zoom: 7,
//     controls: [],
//   });
//   myMap.controls.add('zoomControl');
// }
// //
