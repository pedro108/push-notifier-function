const ValidationError = require('../errors/validation_error');

function validateNotification(notification) {
  return (
    notification.title &&
    notification.subtitle &&
    notification.message
  );
}

function validate(notification) {
  if (!validateNotification(notification)) {
    throw new ValidationError('Notificação inválida! Notificações são compostas por um título, um subtítulo e uma mensagem.');
  }
}

module.exports = {
  validate,
};
