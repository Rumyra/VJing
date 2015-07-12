
function createMap(mapEl, mapLat, mapLon, zoom) {
  zoom = typeof zoom !== 'undefined' ? zoom : 12;
  var myOptions = {
    zoom: zoom,
    center: new google.maps.LatLng(mapLat, mapLon)
  };
  var mapObject = new google.maps.Map(mapEl, myOptions);
  return mapObject;
}

// google maps calculate route function, modified from http://www.sitepoint.com/find-a-route-using-the-geolocation-and-the-google-maps-api/
function calculateRoute(from, to, googleMap) {
  var directionsService = new google.maps.DirectionsService();
  var directionsRequest = {
    origin: from,
    destination: to,
    travelMode: google.maps.DirectionsTravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
  };
  directionsService.route(
    directionsRequest,
    function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        new google.maps.DirectionsRenderer({
          map: googleMap,
          directions: response
        });
      } else {
        console.warn('Unable to retrieve your route');
      }
    }
  );
}