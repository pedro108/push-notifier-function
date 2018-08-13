const Chance = require('chance');
const MockEnv = require('mock-env');
const subject = require('./onesignal_client_builder');

describe('On OneSignal Notification Client execution', () => {
  let chance;
  let mockUserAuthKey, mockAppAuthKey, mockAppId;

  beforeEach(() => {
    chance = new Chance();
    mockUserAuthKey = chance.hash();
    mockAppAuthKey = chance.hash();
    mockAppId = chance.guid();
  });

  it('should build the client with credentials defined in the environment', () => {
    MockEnv.morph(() => {
      const builtClient = subject.build();
      expect(builtClient.userAuthKey).toEqual(mockUserAuthKey);
      expect(builtClient.app.appAuthKey).toEqual(mockAppAuthKey);
      expect(builtClient.app.appId).toEqual(mockAppId);
    }, {
      USER_AUTH_KEY: mockUserAuthKey,
      APP_AUTH_KEY: mockAppAuthKey,
      APP_ID: mockAppId
    });
  });
});
