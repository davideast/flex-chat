/*
 * Login
 * --------------
 * element: <login></login>
 * dependencies: $firebaseAuthService
 */
export function LoginDirective() {
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
LoginDirective.$inject = ['$firebaseAuthService', '$location'];