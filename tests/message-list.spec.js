describe('messagesList', function () {

  beforeEach(module('flexchat'));

  var messagesList;
  beforeEach(inject(function (_messagesList_) {
    messagesList = _messagesList_;
    console.log(messagesList);
  }));

  it('should do ...', function () {
    expect(true).toBe(true);
  });

});