const Chance = require('chance');
const subject = require('./index');

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

    test('it should validate that the request body is a valid notification', () => {
      subject(contextMock, { body: {} });
      expect(contextMock.res).toEqual({
        error: "Notificação deve ter a propriedade requerida title, Notificação deve ter a propriedade requerida message",
        status: 422,
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
