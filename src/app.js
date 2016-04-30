/*
 * Flexchat
 * ----------
 * An angular app demonstrating Firebase & Flexbox.
 */
angular
  .module('flexchat', [
    'firebase',
    'ngRoute',
    'flexchat.templates'
  ])
  .constant('FirebaseUrl', 'https://flexchat.firebaseio.com/')
  .component('flexchatApp', flexchatAppComponent())
  .component('flexchat', flexchatComponent())
  .factory('messagesList', MessagesList)
  .directive('flexchatMessage', MessageDirective)
  .directive('login', LoginDirective)
  .config(ApplicationConfig)
  .run(ApplicationRun);

function MessagesList($firebaseArray, $firebaseRef) {
  return $firebaseArray($firebaseRef.messages.orderByKey().limitToLast(35));
}

function ApplicationConfig($firebaseRefProvider, FirebaseUrl, $routeProvider) {
  $firebaseRefProvider.registerUrl({
    default: FirebaseUrl,
    messages: FirebaseUrl + 'messages'
  });
  
  $routeProvider
    .when('/', {
      template: '<flexchat-app auth-data="$resolve.authData"></flexchat-app>',
      resolve: {
        authData: ['$firebaseAuthService', ($Auth) => {
          return $Auth.$requireAuth();
        }]
      }
    })
    .when('/login', {
      template: '<login></login>'
    })
}

function ApplicationRun($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });  
}

/*
 * Flexchat App
 * --------------
 * element: <flexchat-app></flexchat-app>
 * dependencies: $firebaseArray, $firebaseAuthService
 */
function flexchatAppComponent() {
  return {
    bindings: { authData: '<' },
    controller: function (messagesList) {
      this.messages = messagesList;
      console.log(this.authData);
    },
    templateUrl: 'app.html'
  }
}

/*
 * Flexchat
 * --------------
 * element: <flexchat></flexchat>
 * dependencies: $firebaseArray
 */
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

/*
 * Flexchat Message
 * --------------
 * element: <flexchat-message></flexchat-message>
 * properties: Message { text: string, uid: string }
 */
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

/*
 * Login
 * --------------
 * element: <login></login>
 * dependencies: $firebaseAuthService
 */
function LoginDirective() {
  return {
    restrict: 'E',
    scope: {},
    controllerAs: '$ctrl',
    controller: ($firebaseAuthService, $location) => { 
      console.log('ctrl');
      this.login = () => {
        console.log('login');
        $firebaseAuthService.$authWithOAuthRedirect()
          .then((authData) => {
            $location.href = '/';
          });
      };
    },
    link: (scope, elem, attrs) => {
      
    },
    templateUrl: 'login.html'
  }
}