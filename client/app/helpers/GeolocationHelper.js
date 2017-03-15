import NotificationHelper from './NotificationHelper';

export default class GeolocationHelper {

  static currentLocation() {
    // $(".map-loader").addClass("circles-loader");
    // $('.title-area').hide();
    if (!navigator.geolocation) {
      NotificationHelper.notify("Geolocation is not available on your device. Please type your location into the search field.", 5000)
      setup.reset()
    }

    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 60000
    };

    const result = navigator.geolocation.getCurrentPosition((position) => { console.log(position) }, (error) => { console.log(error) }, options);

    return result;
  };

  static _geolocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    return {lat, lon};
  };

  static _geolocationError(error) {
    new FlashMessage("We couldn't detect your location. Please make sure geolocation is enabled and try again.", 4000);
    setup.reset();
    return false
  };
};

