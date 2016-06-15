export function ApplicationConfig($firebaseRefProvider, FirebaseUrl, $routeProvider) {
  $firebaseRefProvider.registerUrl({
    default: FirebaseUrl,
    messages: FirebaseUrl + '/messages'
  });
  
  $routeProvider
    .when('/', {
      template: '<app auth-data="$resolve.authData"></app>'
    })
    .when('/login', {
      template: '<login></login>'
    })
}
ApplicationConfig.$inject = ['$firebaseRefProvider', 'FirebaseUrl', '$routeProvider'];