export default class NotificationHelper {
  static notify(message, delay) {
    this.show(message);
    window.setTimeout(this.hide, delay);
  };

  static show(message) {
    const notification = document.getElementById('js-flash-message');
    notification.innerHTML = message;
    notification.classList.remove('hidden')
  };

  static hide() {
    const notification = document.getElementById('js-flash-message');
    notification.innerHTML = '';
    notification.classList.add('hidden')
  };
};
