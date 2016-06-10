/*
 * Flexchat
 * ----------
 * An angular app demonstrating Firebase & Flexbox.
 */
var config = {
  apiKey: "AIzaSyC5JSURo_SLXw0I1F0gKbWW0zcfoCz4bmM",
  authDomain: "flexchat.firebaseapp.com",
  databaseURL: "https://flexchat.firebaseio.com",
  storageBucket: "project-8161952438615829383.appspot.com",
};
firebase.initializeApp(config);

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
  .factory('$firebaseStorage', FirebaseStorage)
  .directive('flexchatMessage', MessageDirective)
  .directive('login', LoginDirective)
  .directive('fileUpload', FileUploadDirective)
  .directive('gsUrl', FirebaseStorageDirective)
  .config(ApplicationConfig)
  .run(ApplicationRun);

function MessagesList($firebaseArray, $firebaseRef) {
  return $firebaseArray($firebaseRef.messages.orderByKey().limitToLast(35));
}

function ApplicationConfig($firebaseRefProvider, FirebaseUrl, $routeProvider) {
  $firebaseRefProvider.registerUrl({
    default: FirebaseUrl,
    messages: FirebaseUrl + '/messages'
  });
  
  $routeProvider
    .when('/', {
      template: '<flexchat-app auth-data="$resolve.authData"></flexchat-app>',
      resolve: {
        authData: ['$firebaseAuthService', ($Auth) => {
          //return $Auth.$requireAuth();
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
    bindings: { messages: '<', uploadFile: '<' },
    controller: function ($firebaseStorage) {
      const storageRef = firebase.storage().ref().child('test/thing.png');
      const storage = $firebaseStorage(storageRef);
      
      this.addMessage = (event) => {
        if (event.keyCode && event.keyCode !== 13) { return; }
        const filePresent = !!this.fileUpload;
        
        // Add a message and then upload the file
        this.messages.$add({
          text: this.messageText,
          hasImage: filePresent
        }).then(item => {
          if(filePresent) {
            storage.$put(`messages/${item.key}`); 
          }
        });
        
        this.messageText = '';
      };
      this.uploadImage = () => {       
        const task = storage.$put(this.fileUpload);
        task.$progress(snap => console.log(snap.bytesTransferred));
        task.$complete(snap => console.log(snap));
      };
      this.onChange = (fileList) => {
        this.fileUpload = fileList[0];
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
    scope: {},
    link: function (scope, element, attrs) {
      debugger;
      const storageRef = firebase.storage().ref().child(attrs.gsUrl);
      const storage = $firebaseStorage(storageRef);
      storage.$getDownloadURL().then(url => {
        element[0].src = url;
      });
    }
  }
}

/*
 * $firebaseStorage()
 * --------------
 */
function FirebaseStorage($log, $firebaseUtils, $q) {
  
  function unwrapStorageSnapshot(storageSnapshot) {
    return {
      bytesTransferred: storageSnapshot.bytesTransferred,
      downloadURL: storageSnapshot.downloadURL,
      metadata: storageSnapshot.metadata,
      ref: storageSnapshot.ref,
      state: storageSnapshot.state,
      task: storageSnapshot.task,
      totalBytes: storageSnapshot.totalBytes
    };
  }
  
  function $put(storageRef, file) {
    const task = storageRef.put(file);

    return {
      $progress: function (callback) {
        task.on('state_changed',
          storageSnap => callback(unwrapStorageSnapshot(storageSnap)),
          err => { },
          storageSnap => {}
        );
      },
      $error: function (callback) {
        task.on('state_changed',
          storageSnap => {},
          err => callback(err),
          storageSnap => {}
        );        
      },
      $complete: function (callback) {
        task.on('state_changed',
          storageSnap => {},
          err => {},
          _ => callback(unwrapStorageSnapshot(task.snapshot))
        );
      }
    };
  }
  
  function $getDownloadURL(storageRef) {
    return storageRef.getDownloadURL();
  }
  
  function isStorageRef(value) {
    value = value || {};
    return typeof value.put === 'function';
  }
  
  function _assertStorageRef(storageRef) {
    if (!isStorageRef(storageRef)) {
      throw new Error('$firebaseStorage expects a storage reference from firebase.storage().ref()'); 
    }
  }
  
  return function FirebaseStorage(storageRef) {
    _assertStorageRef(storageRef);
    return {
      $put: function(file) {
        return $put(storageRef, file); 
      },
      $getDownloadURL: function() {
        return $getDownloadURL(storageRef);
      }
    };
  }
  
}
FirebaseStorage.$inject = ['$log', '$firebaseUtils', '$q'];

