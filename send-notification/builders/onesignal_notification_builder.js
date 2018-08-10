const OneSignal = require('onesignal-node');

function build(notification) {
  return new OneSignal.Notification({
    headings: {en: notification.title},
    contents: {en: notification.message},
    subtitle: {en: notification.subtitle},
    included_segments: ["Active Users"],
  });
}

module.exports = {
  build
};
