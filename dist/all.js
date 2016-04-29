
/*
 * Flexchat
 * ----------
 * An angular app demonstrating Firebase & Flexbox.
 */
angular.module('flexchat', ['firebase']).constant('FirebaseUrl', 'https://flexchat.firebaseio.com/').component('flexchatApp', flexchatAppComponent()).component('flexchat', flexchatComponent()).factory('messagesList', MessagesList).directive('flexchatMessage', MessageDirective).config(ApplicationConfig);

function ApplicationConfig($firebaseRefProvider, FirebaseUrl) {
  $firebaseRefProvider.registerUrl({
    default: FirebaseUrl,
    messages: FirebaseUrl + 'messages'
  });
}

function MessagesList($firebaseArray, $firebaseRef) {
  return $firebaseArray($firebaseRef.messages.orderByKey().limitToLast(25));
}

function flexchatAppComponent() {
  return {
    controller: function (messagesList) {
      this.messages = messagesList;
    },
    template: '<flexchat messages="$ctrl.messages"></flexchat>'
  };
}

function flexchatComponent() {
  return {
    bindings: { messages: '<' },
    controller: function () {
      this.addMessage = event => {
        if (event.keyCode && event.keyCode !== 13) {
          return;
        }
        this.messages.$add({
          text: this.messageText
        });
        this.messageText = '';
      };
    },
    template: `
  <header>
    <h3>flex-chat</h3>
  </header>

  <div class="chat-container">
    <flexchat-message 
      class="chat-section animated fadeInUp"
      ng-repeat="message in $ctrl.messages" 
      message="message">
    </flexchat-message>
  </div>

  <div class="input-bar">
    <input type="text" ng-model="$ctrl.messageText" ng-keyup="$ctrl.addMessage($event)" />
    <button ng-click="$ctrl.addMessage($event)">Send</button>
  </div>
`
  };
}

function MessageDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: { message: '=message' },
    controllerAs: '$ctrl',
    controller: () => {},
    link: (scope, elem, attrs) => {
      elem[0].scrollIntoView();
    },
    template: `
  <div class="chat-message">
    <div>{{ $ctrl.message.text }}</div>
  </div>
`
  };
}
//# sourceMappingURL=all.js.map
