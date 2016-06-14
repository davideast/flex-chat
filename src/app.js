import {initializeFirebaseApp} from './config/firebase-config';
import {MessagesList} from './messages/messages-list';
import {flexchatComponent} from './chat/flexchat-component';
import {Blobify} from './storage/blobify';
import {FirebaseStorage} from './storage/firebase-storage';

/*
 * Flexchat
 * ----------
 * An angular app demonstrating Firebase & Flexbox.
 */
const config = initializeFirebaseApp();

angular
  .module('flexchat', [
    'firebase',
    'ngRoute',
    'flexchat.templates'
  ])
  .constant('FirebaseUrl', config.databaseURL)
  .component('flexchatApp', flexchatAppComponent())
  .component('flexchat', flexchatComponent())
  .factory('messagesList', MessagesList)
  .factory('blobify', Blobify)
  .factory('$firebaseStorage', FirebaseStorage)
  .directive('flexchatMessage', MessageDirective)
  .directive('login', LoginDirective)
  .directive('fileUpload', FileUploadDirective)
  .directive('gsUrl', FirebaseStorageDirective)
  .config(ApplicationConfig)
  .run(ApplicationRun);

function ApplicationConfig($firebaseRefProvider, FirebaseUrl, $routeProvider) {
  $firebaseRefProvider.registerUrl({
    default: FirebaseUrl,
    messages: FirebaseUrl + '/messages'
  });
  
  $routeProvider
    .when('/', {
      template: '<flexchat-app auth-data="$resolve.authData"></flexchat-app>'
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
    },
    templateUrl: 'app.html'
  }
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
    bindToController: { message: '=' },
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

function FileUploadDirective() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      onChange: '='
    },
    template: `
      <input type="file" name="file" id="firebase-storage-file" class="inputfile" />
      <label for="firebase-storage-file"><ng-transclude></ng-transclude></label>
    `,
    link: function (scope, element, attrs) {
      element.bind('change', function () {
        scope.onChange(Array.from(element.children()[0].files));
      });
    }
  }
}

function FirebaseStorageDirective($firebaseStorage) {
  return {
    restrict: 'A',
    priority: 99, // it needs to run after the attributes are interpolated
    scope: {},
    link: function (scope, element, attrs) {
      attrs.$observe('gsUrl', function (newVal, oldVal) {
        if (newVal !== '') {
          const storageRef = firebase.storage().ref().child(attrs.gsUrl);
          const storage = $firebaseStorage(storageRef);
          storage.$getDownloadURL().then(url => {
            element[0].src = url;
          });          
        }
      });
    }
  }
}

