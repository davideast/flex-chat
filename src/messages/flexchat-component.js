/*
 * Flexchat
 * --------------
 * element: <flexchat></flexchat>
 * dependencies: $firebaseArray
 */

export function flexchatComponent() {
  return {
    bindings: { messages: '<', authData: '<' },
    controller: function (messageBlob, modalFactory) {
      var localScope = this;
      this.messageText = '';
      this.fileUpload = null;

      this.messages.listenToLatest(latest => {
        const messageElement = document.getElementById(`flexchat-message-${latest.$id}`);
        messageElement.scrollIntoView();
      });

      this.addMessage = (event) => {
        if (event.keyCode && event.keyCode !== 13) { return; }
        
        messageBlob.addBlobMessage({
          text: this.messageText,
          file: this.fileUpload
        });

        this.messageText = '';
        this.fileUpload = null;
      };

      this.onChange = (fileList) => {
        this.fileUpload = fileList[0];
      };

      this.promptLogin = _ => {
        debugger;
        this.modal.show();
      };

      modalFactory({
        controller: class LoginCtrl{},
        templateUrl: 'login.html',
        scope: {}
      }).then(modal => this.modal = modal);

    },

    templateUrl: 'flexchat.html'
  };
}