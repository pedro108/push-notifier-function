const Chance = require('chance');
const subject = require('./send_notification_service');
const OneSignalClientBuilder = require('../builders/onesignal_client_builder.js');
const OneSignalNotificationBuilder = require('../builders/onesignal_notification_builder');
const NotificationValidator = require('../validators/notification_validator.js');

jest.mock('../builders/onesignal_client_builder.js');
jest.mock('../builders/onesignal_notification_builder');
jest.mock('../validators/notification_validator');

describe('When a notification is sent', () => {
  let chance;
  let mockNotification;
  let mockOneSignalClient;
  let mockOneSignalNotification;
  let mockSendNotification;

  beforeEach(() => {
    chance = new Chance();
    mockNotification = jest.fn();
    mockOneSignalNotification = jest.fn();
    mockSendNotification = jest.fn();
    mockOneSignalClient = { sendNotification: mockSendNotification };

    OneSignalClientBuilder.build.mockReturnValue(mockOneSignalClient);
    OneSignalNotificationBuilder.build.mockImplementation((notification) => {
      if (notification === mockNotification) return mockOneSignalNotification;
      return null;
    });
  });

  it('should validate the notification object', () => {
    subject.send(mockNotification);
    expect(NotificationValidator.validate).toBeCalledWith(mockNotification);
  });

  it('should build the OneSignal Client and Notification with the given notification object', () => {
    subject.send(mockNotification);
    expect(OneSignalClientBuilder.build).toBeCalled();
    expect(OneSignalNotificationBuilder.build).toBeCalledWith(mockNotification);
  });

  describe('successfully', () => {
    it('should send the notification and handle its callback correctly as a promise', () => {
      const mockHttpResponse = { statusCode: chance.natural({ max: 999 }) };
      const mockData = { data: chance.guid() };

      mockSendNotification.mockImplementationOnce((notification, callback) => {
        expect(notification).toEqual(mockOneSignalNotification);
        callback(false, mockHttpResponse, mockData);
      });

      subject.send(mockNotification).then((result) => {
        expect(result.status).toEqual(mockHttpResponse.statusCode);
        expect(result.body.data).toEqual(mockData);
        expect(result.body.name).toEqual('Notificação enviada com sucesso!');
      });
    });
  });

  describe('with errors', () => {
    describe('when it is a OneSignal response error', () => {
      it('should return an error message in the resolved body', () => {
        const mockHttpResponse = { statusCode: chance.natural({ min: 400, max: 999 }) };
        const mockData = { data: chance.guid() };

        mockSendNotification.mockImplementationOnce((notification, callback) => {
          expect(notification).toEqual(mockOneSignalNotification);
          callback(true, mockHttpResponse, mockData);
        });

        subject.send(mockNotification).then((result) => {
          expect(result.body.name).toEqual('Erro ao enviar notificação');
        });
      });
    });

    describe('when it throws an exception', () => {
      it('should handle a sendNotification exception with a promise rejection', () => {
        const mockException = chance.sentence();
        mockSendNotification.mockImplementationOnce((notification) => {
          expect(notification).toEqual(mockOneSignalNotification);
          throw new Error(mockException);
        });

        subject.send(mockNotification).catch((reason) => {
          expect(reason.message).toEqual(mockException);
        });
      });
    });
  });
});
