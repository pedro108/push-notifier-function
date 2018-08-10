const OneSignal = require('onesignal-node');

function build() {
  return new OneSignal.Client({
    userAuthKey: process.env.USER_AUTH_KEY,
    app: {
      appId: process.env.APP_ID,
      appAuthKey: process.env.APP_AUTH_KEY
    }
  });
}

module.exports = {
  build
};
