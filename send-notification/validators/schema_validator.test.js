const AJV = require('ajv');
const chance = require('chance');
const subject = require('./schema_validator');
const ValidationError = require('../errors/validation_error');

jest.mock('ajv');

describe('On schema validation', () => {
  let chance;
  let modelName;
  let schema;
  let data;

  beforeEach(() => {
    chance = new Chance();
    AJV.mockClear();
    modelName = chance.name();
    schema = jest.fn();
    data = jest.fn();
  });

  describe('when it validates a data object with a given schema', () => {
    it('constructs the AJV object to validate the schema', () => {
      subject.validate(modelName, schema, data);
      expect(AJV).toBeCalledWith({ allErrors: true });
    });

    it('compiles the validator with the given schema', () => {
      subject.validate(modelName, schema, data);
      expect(AJV.mockCompile).toBeCalledWith(schema);
    });

    it('validates using the compiled validator with the given data', () => {
      subject.validate(modelName, schema, data);
      expect(AJV.mockValidator).toBeCalledWith(data);
    });

    describe('and the data object is valid', () => {
      it('should not throw a validation error', () => {
        expect(() => subject.validate(modelName, schema, data)).not.toThrow();
      });
    });

    describe('and the data object is invalid', () => {
      let mockErrorMessage;
      let mockErrors;

      beforeEach(() => {
        mockErrorMessage = chance.sentence();
        mockErrors = jest.fn();

        AJV.mockValidator = jest.fn(() => false);
        AJV.mockValidator.errors = mockErrors;
        AJV.mockCompile = jest.fn(() => AJV.mockValidator);
        AJV.mockErrorsText = jest.fn(() => `data ${mockErrorMessage}`);
      });

      it('should retrieve the error message from the validator errors property', () => {
        try {
          subject.validate(modelName, schema, data);
        } catch(e) {
          expect(AJV.mockErrorsText).toBeCalledWith(mockErrors);
        }
      });

      it('should throw a ValidationError with the schema errors message', () => {
        expect(() => subject.validate(modelName, schema, data)).toThrow(ValidationError);
      });

      it('should throw an error with the modelName in the error message', () => {
        expect(() => subject.validate(modelName, schema, data))
          .toThrow(`${modelName} ${mockErrorMessage}`);
      });
    });
  });
});
