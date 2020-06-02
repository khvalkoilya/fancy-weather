import vars from './variables.js';

export default function init() {
  const myMap = new ymaps.Map('map', {
    center: [vars.coordinates.lat, vars.coordinates.lng],
    zoom: 7,
    controls: [],
  });
  myMap.controls.add('zoomControl');
  myMap.geoObjects
    .add(new ymaps.Placemark([vars.coordinates.lat, vars.coordinates.lng], {
      balloonContent: `${vars.city}`,
    }, {
      iconColor: 'rgba(65,53,45, 0.8)',
    }));
  mapMarkup();
}

function separator(what) {
  return Number(vars.coordinates[what]).toFixed(2).toString().split('.');
}

function filler(to, what) {
  vars[to].innerHTML = what;
}

function mapMarkup() {
  const lat = separator('lat')
  const lng = separator('lng');
  filler('latDeg', lat[0])
  filler('latMin', lat[1])
  filler('lngDeg', lng[0])
  filler('lngMin', lng[1])
  // console.log(lat, lng);

}
