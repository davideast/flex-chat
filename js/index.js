'use strict';

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
    controller: function controller(messagesList) {
      this.messages = messagesList;
    },
    template: '<flexchat messages="$ctrl.messages"></flexchat>'
  };
}

function flexchatComponent() {
  return {
    bindings: { messages: '<' },
    controller: function controller() {
      var _this = this;

      this.addMessage = function (event) {
        if (event.keyCode && event.keyCode !== 13) {
          return;
        }
        _this.messages.$add({
          text: _this.messageText
        });
        _this.messageText = '';
      };
    },
    template: '\n  <header>\n    <h3>flex-chat</h3>\n  </header>\n\n  <div class="chat-container">\n    <flexchat-message \n      class="chat-section animated fadeInUp"\n      ng-repeat="message in $ctrl.messages" \n      message="message">\n    </flexchat-message>\n  </div>\n\n  <div class="input-bar">\n    <input type="text" ng-model="$ctrl.messageText" ng-keyup="$ctrl.addMessage($event)" />\n    <button ng-click="$ctrl.addMessage($event)">Send</button>\n  </div>\n'
  };
}

function MessageDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: { message: '=message' },
    controllerAs: "$ctrl",
    controller: function controller() {},
    link: function link(scope, elem, attrs) {
      elem[0].scrollIntoView();
    },
    template: '\n  <div class="chat-message">\n    <div>{{ $ctrl.message.text }}</div>\n  </div>\n'
  };
}