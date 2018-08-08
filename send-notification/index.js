require('dotenv').load();
const OneSignal = require('onesignal-node');
const client = require('./client.js');

module.exports = function (context, req) {
  try {
    const oneSignalClient = client.build();

    if (req.body && req.body.name) {
      const notification = new OneSignal.Notification({
        contents: {en: req.body.message},
        headings: {en: req.body.title},
        subtitle: {en: req.body.subtitle},
        included_segments: ["Active Users"],
      });
      oneSignalClient.sendNotification(notification, function (err, httpResponse, data) {
        if (!err) {
          context.res = {
            // status: 200, /* Defaults to 200 */
            body: {"name": "Notificação enviada para " + req.body.name, data},
          };
        } else {
          context.res = {
            status: httpResponse.statusCode,
            body: {"name": "Erro ao enviar notificação para " + req.body.name, data},
          };
        }
        context.done();
      });
    }
    else {
      context.res = {
        status: 400,
        body: "Please pass a name in the request body",
      };
      context.done();
    }
  } catch (err) {
    context.res = {
      status: 500,
      error: err,
    };
    context.done();
  }
};
