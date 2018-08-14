const Chance = require('chance');
const subject = require('./onesignal_notification_builder');
const Notification = require('../models/notification');

describe('On OneSignal Notification Builder execution', () => {
  let chance;
  let contextMock;

  beforeEach(() => {
    chance = new Chance();
    contextMock = new Notification({
      title: chance.name(),
      message: chance.sentence(),
      link: chance.url(),
      deviceIds: [chance.guid()],
    });
  });

  it('should send notification with deviceIds included', () => {
    const builtNotification = subject.build(contextMock);
    expect(builtNotification.postBody["include_player_ids"]).toEqual(contextMock.deviceIds);
    expect(builtNotification.postBody["included_segments"]).toEqual(undefined);
  });

  describe('it should send notification without deviceIds included', () => {
    it('when deviceIds is an empty array', () => {
      contextMock.deviceIds = [];
      const builtNotification = subject.build(contextMock);
      expect(builtNotification.postBody["include_player_ids"]).toEqual(undefined);
      expect(builtNotification.postBody["included_segments"]).toEqual(["Active Users"]);
    });

    it('when deviceIds is null or undefined', () => {
      contextMock.deviceIds = null;
      const builtNotification = subject.build(contextMock);
      expect(builtNotification.postBody["include_player_ids"]).toEqual(undefined);
      expect(builtNotification.postBody["included_segments"]).toEqual(["Active Users"]);
    });
  });
});
