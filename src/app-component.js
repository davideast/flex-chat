/*
 * App
 * --------------
 * element: <app></app>
 */
export function appComponent() {
  return {
    bindings: { user: '<', messages: '<', redirectResult: '<' },
    controller: function AppCtrl (twitterUser, $firebaseAuthService) {
      this.twitterUser = twitterUser();
      this.login = _ => $firebaseAuthService.$signInWithRedirect('twitter');
    },
    templateUrl: 'app.html'
  }
}