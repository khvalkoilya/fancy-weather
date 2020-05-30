import vars from './variables.js';

export default function workWithCoordinates() {
  const coords = vars.coordinatesObject;
  vars.city = coords.results[0].components.state;
  vars.country = coords.results[0].components.country;
  vars.coordinates = coords.results[0].geometry;
  vars.cityBlock.innerHTML = `${vars.city.toUpperCase()}, <span class="country">${vars.country.toUpperCase()}</span>`;
}
