const ValidationError = require('../errors/validation_error');

function validate(request) {
  if(!request.body) {
    throw new ValidationError('O corpo da requisição é obrigatório!');
  }
}

module.exports = {
  validate,
};
