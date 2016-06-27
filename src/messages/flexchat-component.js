/*
 * Flexchat
 * --------------
 * element: <flexchat></flexchat>
 * dependencies: $firebaseArray
 */

export function flexchatComponent() {
  return {
    bindings: { messages: '<', user: '<', redirectResult: '<' },
    require: { parent: '^app' },
    controller: function (messageBlob, modalFactory, $document, $firebaseAuthService, $timeout) {
      const ctrl = this;
      ctrl.messageText = '';
      ctrl.fileUpload = null;

      if (ctrl.redirectResult && ctrl.redirectResult.user) {
        ctrl.user = ctrl.redirectResult.user;
      }

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
          file: ctrl.fileUpload
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
          if (e.target.id === 'flx-login' || 
              e.target.parentElement.id === 'flx-login' ||
              e.target.id === 'btLogin') {
            return;
          }
          ctrl.modal.hide();
        });        
      };

      modalFactory({
        controller: function LoginCtrl($firebaseAuthService) {
          this.login = _ => $firebaseAuthService.$signInWithRedirect('twitter');
        },
        templateUrl: 'login.html',
      }).then(modal => ctrl.modal = modal);

    },

    templateUrl: 'flexchat.html'
  };
}