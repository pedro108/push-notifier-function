const Chance = require('chance');
const subject = require('./index');
const ValidationError = require('./errors/validation_error');
const SendNotificationService = require('./services/send_notification_service');

jest.mock('./services/send_notification_service');

describe('On function execution', () => {
  let chance;
  let contextMock;

  beforeEach(() => {
    chance = new Chance();
    contextMock = {
      done: jest.fn(),
      res: {
        body: {},
        status: {}
      },
    };

    SendNotificationService.send = jest.fn(() => Promise.resolve({
      status: 200,
      body: {
        name: 'Notificação enviada com sucesso!',
        data: {},
      }
    }));
  });

  describe('with an invalid input', () => {
    test('it should validate the request', () => {
      subject(contextMock, {});
      expect(contextMock.res).toEqual({
        error: "O corpo da requisição é obrigatório!",
        status: 422,
      });
      expect(contextMock.done.mock.calls.length).toBe(1);
    });

    test('it should handle validation exceptions', () => {
      const mockError = chance.sentence();
      SendNotificationService.send.mockImplementationOnce(() => {
        throw new ValidationError(mockError);
      });

      subject(contextMock, { body: {} });
      expect(contextMock.res).toEqual({
        error: mockError,
        status: 422,
      });
      expect(contextMock.done.mock.calls.length).toBe(1);
    });

    test('it should handle unexpected exceptions', () => {
      const mockError = chance.sentence();
      SendNotificationService.send.mockImplementationOnce(() => {
        throw new Error(mockError);
      });

      subject(contextMock, { body: {} });
      expect(contextMock.res).toEqual({
        error: mockError,
        status: 500,
      });
      expect(contextMock.done.mock.calls.length).toBe(1);
    });
  });

  describe('with a valid input', () => {
    test('it should send the notification and write the context', async () => {
      expect.assertions(2);
      await subject(contextMock, {
        body: {
          title: chance.name(),
          message: chance.sentence(),
          deviceIds: [chance.guid()],
          link: chance.url(),
        },
      });
      expect(contextMock.res).toEqual({
        status: 200,
        body: {
          name: 'Notificação enviada com sucesso!',
          data: {},
        },
      });
      expect(contextMock.done.mock.calls.length).toBe(1);
    });
  });

});
