import NotificationHelper from './NotificationHelper';

export default class GoogleGeocodeHelper {

  static geocodeAddress(address) {
    new google.maps.Geocoder().geocode( { address }, (response, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        const lat = response[0].geometry.location.lat();
        const lon = response[0].geometry.location.lng();
        return { lat, lon }
      } else {
        NotificationHelper.notify("Sorry, there was an error with your search: " + status, 4000);
        return null;
      }
    });
  }
}
