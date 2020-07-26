/* eslint-disable */

export const displayMap = (locations) => {
 mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxlc2VtaWRkIiwiYSI6ImNrY3dpbnp4ZjBibHUyc3FwcjN1bTU4NWQifQ.aWxKPhZ2op8tXay8P_V2Tw';

 var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/alesemidd/ckcwj9o800azq1jqyav9wk971',
  center: [-75.695592, 45.418219],
  zoom: 10,
 });

 const bounds = new mapboxgl.LngLatBounds();

 locations.forEach((loc) => {
  //create marker
  const el = document.createElement('div');
  el.className = 'marker';

  //add marker
  new mapboxgl.Marker({
   element: el,
   anchor: 'bottom',
  })
   .setLngLat(loc.coordinates)
   .addTo(map);

  //add popup
  new mapboxgl.Popup({
   offset: 30,
  })
   .setLngLat(loc.coordinates)
   .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
   .addTo(map);
  //extent map to include current location
  bounds.extend(loc.coordinates);
 });

 map.fitBounds(bounds, {
  padding: {
   top: 200,
   bottom: 150,
   left: 100,
   right: 100,
  },
 });
};
