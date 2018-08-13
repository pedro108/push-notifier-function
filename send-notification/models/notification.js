module.exports = class Notification {
  constructor({ title, deviceIds, message, link }) {
    this.title = title;
    this.message = message;
    this.deviceIds = deviceIds;
    this.link = link;
  }
};
