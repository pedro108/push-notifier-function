const NotificationValidator = require('../../validators/notification_validator.js');

function send(notification) {
  NotificationValidator.validate(notification);
  return new Promise(function(resolve) {
    resolve({
      status: 200,
      body: {
        name: 'Notificação enviada com sucesso!',
        data: {},
      }
    });
  });
}

module.exports = {
  send
};
