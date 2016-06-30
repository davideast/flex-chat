/*
 * Flexchat
 * --------------
 * element: <flexchat></flexchat>
 * dependencies: $firebaseArray
 */

function FlexchatComponentCtrl(messageBlob, modalFactory, $document, $firebaseAuthService, $timeout, twitterUser) {
  const ctrl = this;
  ctrl.messageText = '';
  ctrl.fileUpload = null;
  ctrl.twitterUser = twitterUser();

  if (ctrl.redirectResult && ctrl.redirectResult.user) {
    ctrl.user = ctrl.redirectResult.user;    
  }

  // Listen for the recently added message and scroll it into view
  ctrl.messages.listenToLatest(latest => {
    const messageElement = document.getElementById(`flexchat-message-${latest.$id}`);
    messageElement.scrollIntoView();
  });

  ctrl.addMessage = (event) => {

    if (event.keyCode && event.keyCode == 13 && !ctrl.user) {
      ctrl.promptLogin();
      return;
    }

    if (event.keyCode && event.keyCode !== 13) { return; }
    
    messageBlob.addBlobMessage({
      text: ctrl.messageText,
      file: ctrl.fileUpload,
      uid: ctrl.user.uid,
      displayName: ctrl.twitterUser.displayName,
      photoURL: ctrl.twitterUser.photoURL
    });

    ctrl.messageText = '';
    ctrl.fileUpload = null;
  };

  ctrl.onChange = (fileList) => {
    ctrl.fileUpload = fileList[0];
  };

  ctrl.promptLogin = _ => {
    ctrl.modal.show();
    $document.bind('click', e =>  {
      if (e.target !== null && e.target.id === 'flx-login' || 
          e.target.parentElement.id === 'flx-login' ||
          e.target.id === 'btLogin') {
        return;
      }
      ctrl.modal.hide();
    });        
  };

  ctrl.isLocalSender = message => {
    return message !== undefined && message.uid !== undefined && this.user !== null && this.user.uid !== null && message.uid === this.user.uid;
  };
  
  ctrl.messageSenderClass = message => {
    return this.isLocalSender(message) ? "chat-section-local-sender" : "";
  };

  modalFactory({
    controller: function LoginCtrl($firebaseAuthService) {
      this.login = _ => $firebaseAuthService.$signInWithRedirect('twitter');
    },
    templateUrl: 'login.html',
  }).then(modal => ctrl.modal = modal);
}
FlexchatComponentCtrl.$inject = ['messageBlob', 'modalFactory', '$document', '$firebaseAuthService', '$timeout', 'twitterUser'];

export function flexchatComponent() {
  return {
    bindings: { messages: '<', user: '<', redirectResult: '<' },
    require: { parent: '^app' },
    controller: FlexchatComponentCtrl,
    templateUrl: 'flexchat.html'
  };
}