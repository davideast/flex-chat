/*
 * Flexchat
 * ----------
 * An angular app demonstrating Firebase & Flexbox.
 */
angular
  .module('flexchat', [
    'firebase'
  ])
  .constant('FirebaseUrl', 'https://flexchat.firebaseio.com/')
  .component('flexchatApp', flexchatAppComponent())
  .component('flexchat', flexchatComponent())
  .factory('messagesList', MessagesList)
  .directive('flexchatMessage', MessageDirective)
  .config(ApplicationConfig);

function MessagesList($firebaseArray, $firebaseRef) {
  return $firebaseArray($firebaseRef.messages.orderByKey().limitToLast(25));
}

function ApplicationConfig($firebaseRefProvider, FirebaseUrl) {
  $firebaseRefProvider.registerUrl({
    default: FirebaseUrl,
    messages: FirebaseUrl + 'messages'
  });
}

function flexchatAppComponent() {
  return {
    controller: ['messagesList', function (messagesList) {
      this.messages = messagesList;
    }],
    templateUrl: 'app.html'
  }
}

function flexchatComponent() {
  return {
    bindings: { messages: '<' },
    controller: function () {
      this.addMessage = (event) => {
        if (event.keyCode && event.keyCode !== 13) { return; }
        this.messages.$add({
          text: this.messageText
        });
        this.messageText = '';
      };
    },
    templateUrl: 'chat.html'
  };
}

function MessageDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: { message: '=message' },
    controllerAs: '$ctrl',
    controller: () => { },
    link: (scope, elem, attrs) => {
      elem[0].scrollIntoView();
    },
    templateUrl: 'message.html'
  }
}