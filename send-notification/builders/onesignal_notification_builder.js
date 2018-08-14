const OneSignal = require('onesignal-node');

function build(notification) {
  let buildParameters = {
    headings: {en: notification.title},
    contents: {en: notification.message},
    url: notification.link,
  };

  if (notification.deviceIds && notification.deviceIds.length > 0) {
    buildParameters.include_player_ids = notification.deviceIds;
  } else {
    buildParameters.included_segments = ["Active Users"];
  }

  return new OneSignal.Notification(buildParameters);
}

module.exports = {
  build
};
