export function ApplicationConfig($firebaseRefProvider, FirebaseUrl, $routeProvider) {
  $firebaseRefProvider.registerUrl({
    default: FirebaseUrl,
    messages: FirebaseUrl + '/messages'
  });
  
  $routeProvider
    .when('/', {
      template: `
        <app 
          user="$resolve.user"
          messages="$resolve.messages">
        </app>`,
      resolve: {
        user: function($firebaseAuthService) {
          return $firebaseAuthService.$waitForSignIn();
        },
        messages: function(messagesList) {
          return messagesList.$loaded();
        }
      }
    });
}
ApplicationConfig.$inject = ['$firebaseRefProvider', 'FirebaseUrl', '$routeProvider'];