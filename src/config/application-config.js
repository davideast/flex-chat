export function ApplicationConfig($firebaseRefProvider, FirebaseUrl, $routeProvider) {
  $firebaseRefProvider.registerUrl({
    default: FirebaseUrl,
    messages: FirebaseUrl + '/messages'
  });
  
  $routeProvider
    .when('/', {
      template: '<app auth-data="$resolve.authData"></app>'
    })
}
ApplicationConfig.$inject = ['$firebaseRefProvider', 'FirebaseUrl', '$routeProvider'];