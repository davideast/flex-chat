describe('messagesList', function () {

  beforeEach(module('flexchat'));

  var messagesList;
  beforeEach(inject(function (_messagesList_) {
    messagesList = _messagesList_;
    firebase.database().goOffline();
  }));

  it('should do ...', function (done) {
    
  });

});