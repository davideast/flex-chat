export function MessagesList($firebaseArray, $firebaseRef, $timeout, $location, $anchorScroll) {
  var MessageList = $firebaseArray.$extend({

    initialLastKey: null,

    scrollToRecent: function() {
      this.$list.$loaded(messages => {
        this.initialLastKey = messages[messages.length - 1].$id;
        this.$$specifyScroll(this.initialLastKey);       
      })
    },

    $$added: function (snap) {
      const rec = snap.val();
      if (!!this.initialLastKey) {
        this.$$specifyScroll(snap.key);
      }
      rec.$id = snap.key;
      return rec;
    },

    $$specifyScroll(key) {
      //$location.path(`flexchat-message-${key}`, false);
      //debugger;
      //$location.search({ last: `flexchat-message-${key}` });
      $timeout(_ => {
        debugger;
        const lastMessage = document.getElementById(`flexchat-message-${key}`);
        lastMessage.scrollIntoView();
      });  
    }
  });
  
  return new MessageList($firebaseRef.messages.orderByKey().limitToLast(35));
}

export function messagesScroll($anchorScroll, $location, $timeout) {
  return function messagesScroll(messages) {
    const lastKey = messages[messages.length - 1].$id;
    $location.hash(`flexchat-message-${lastKey}`);
    $timeout(_ => $anchorScroll());

    this.messages.$watch(event => {

      if (event.event = 'child_added') {
        $location.hash(`flexchat-message-${event.key}`);
        $timeout(_ => $anchorScroll());
      }

    });
  }
}

