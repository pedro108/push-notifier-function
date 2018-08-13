const OneSignalClientBuilder = require('../builders/onesignal_client_builder.js');
const OneSignalNotificationBuilder = require('../builders/onesignal_notification_builder');
const NotificationValidator = require('../validators/notification_validator.js');

function sendNotification(oneSignalNotification) {
  return new Promise(function(resolve, reject) {
    try {
      const oneSignalClient = OneSignalClientBuilder.build();
      oneSignalClient.sendNotification(oneSignalNotification, function (err, httpResponse, data) {
        resolve({
          status: httpResponse.statusCode,
          body: {
            name: (err ? 'Erro ao enviar notificação' : 'Notificação enviada com sucesso!'),
            data,
          }
        });
      });
    } catch (e) {
      reject(e);
    }
  });
}

function send(notification) {
  NotificationValidator.validate(notification);
  const oneSignalNotification = OneSignalNotificationBuilder.build(notification);
  return sendNotification(oneSignalNotification);
}

module.exports = {
  send
};
