require('dotenv').load();
const Notification = require('./models/notification');
const SendNotificationService = require('./services/send_notification_service');
const RequestValidator = require('./validators/request_validator');

module.exports = function (context, req) {
  try {
    RequestValidator.validate(req);

    SendNotificationService.send(new Notification(req.body))
      .then((response) => {
        context.res = response;
        context.done();
      });
  } catch (err) {
    context.res = {
      status: err.constructor.name === 'ValidationError' ? 422 : 500,
      error: err.message,
    };
    context.done();
  }
};
