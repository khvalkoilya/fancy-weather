import vars from './variables.js';

export default function workWithCoordinates() {
  const coords = vars.coordinatesObject;
  console.log(coords);
  vars.city = coords.results[0].components.city
  || coords.results[0].components.state
  || coords.results[0].components.continent;
  vars.country = coords.results[0].components.country;
  vars.coordinates = coords.results[0].geometry;
}
