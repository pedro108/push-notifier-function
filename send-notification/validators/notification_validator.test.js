const SchemaValidator = require('./schema_validator');
const NotificationSchema = require('../schemas/notification_schema');
const subject = require('./notification_validator');

jest.mock('./schema_validator');

describe('On notification validation', () => {
  it('should validate the notification using SchemaValidator', () => {
    const mockNotification = jest.fn();
    subject.validate(mockNotification);
    expect(SchemaValidator.validate).toBeCalledWith('Notificação', NotificationSchema, mockNotification);
  });
});
