const Notification = require('./models/notification');
const SendNotificationService = require('./services/send_notification_service');
const RequestValidator = require('./validators/request_validator');

function handleError(error, context) {
  context.res = {
    status: error.constructor.name === 'ValidationError' ? 422 : 500,
    error: error.message,
  };
  context.done();
}

module.exports = function (context, req) {
  try {
    RequestValidator.validate(req);

    return SendNotificationService.send(new Notification(req.body))
      .then((response) => {
        context.res = response;
        context.done();
      })
      .catch((reason) => handleError(new Error(reason), context));
  } catch (error) {
    handleError(error, context);
  }
};
