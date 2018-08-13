const AJV = require('ajv');
const AJVI18n = require('ajv-i18n');
const ValidationError = require('../errors/validation_error');

function validate(modelName, schema, data) {
  const ajv = new AJV({ allErrors: true });
  const ajvValidator = ajv.compile(schema);
  if (!ajvValidator(data)) {
    AJVI18n['pt-BR'](ajvValidator.errors);
    throw new ValidationError(ajv.errorsText(ajvValidator.errors).replace(/data/g, modelName));
  }
}

module.exports = {
  validate,
};
