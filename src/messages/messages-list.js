export function MessagesList($firebaseArray, $firebaseRef, $timeout) {
  var MessageList = $firebaseArray.$extend({
    /*
     * Wait for the initial set of data and create a 
     * 'child_added' observer for the lastest message
     */
    listenToLatest: function(callback) {
      this.$list.$loaded(messages => {
        const lastKey = messages[messages.length - 1].$id;
        $firebaseRef.messages.orderByKey().startAt(lastKey)
          .on('child_added', (snap) => {
            $timeout(_ => {
              const rec = snap.val();
              rec.$id = snap.key;
              callback(rec);
            })
          });
      });
    }
  });
  
  return new MessageList($firebaseRef.messages.orderByKey().limitToLast(35));
}
