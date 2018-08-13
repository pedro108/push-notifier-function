const SchemaValidator = require('./schema_validator');
const NotificationSchema = require('../schemas/notification_schema');

function validate(notification) {
  return SchemaValidator.validate('Notificação', NotificationSchema, notification);
}

module.exports = {
  validate,
};
