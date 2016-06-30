/*
 * App
 * --------------
 * element: <app></app>
 */

function AppComponentCtrl(twitterUser, $firebaseAuthService) {
  this.twitterUser = twitterUser();
  this.login = _ => $firebaseAuthService.$signInWithRedirect('twitter');
}
AppComponentCtrl.$inject = ['twitterUser', '$firebaseAuthService'];

export function appComponent() {
  return {
    bindings: { user: '<', messages: '<', redirectResult: '<' },
    controller: AppComponentCtrl,
    templateUrl: 'app.html'
  }
}