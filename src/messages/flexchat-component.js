/*
 * Flexchat
 * --------------
 * element: <flexchat></flexchat>
 * dependencies: $firebaseArray
 */

export function flexchatComponent() {
  return {
    bindings: { messages: '<', user: '<' },
    require: { parent: '^app' },
    controller: function (messageBlob, modalFactory, $document, $firebaseAuthService) {
      this.messageText = '';
      this.fileUpload = null;

      this.messages.listenToLatest(latest => {
        const messageElement = document.getElementById(`flexchat-message-${latest.$id}`);
        messageElement.scrollIntoView();
      });

      this.addMessage = (event) => {

        if (event.keyCode && event.keyCode == 13 && !this.user) {
          this.promptLogin();
          return;
        }

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
        this.modal.show();
        $document.bind('click', e =>  {
          if (e.target.id === 'flx-login' || 
              e.target.parentElement.id === 'flx-login' ||
              e.target.id === 'btLogin') {
            return;
          }
          this.modal.hide();
        });        
      };

      modalFactory({
        controller: function LoginCtrl($firebaseAuthService) {
          this.login = _ => {
            $firebaseAuthService.$signInWithRedirect('twitter').then(user => {
              console.log(user);
            });
          };
        },
        templateUrl: 'login.html',
      }).then(modal => this.modal = modal);

    },

    templateUrl: 'flexchat.html'
  };
}