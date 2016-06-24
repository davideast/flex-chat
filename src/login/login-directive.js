/*
 * Login
 * --------------
 * element: <login></login>
 * dependencies: $firebaseAuthService
 */
export function LoginDirective() {
  return {
    restrict: 'E',
    scope: { },
    controllerAs: '$ctrl',
    controller: function ($scope, $element, $attrs, $firebaseAuthService, $location) { 
      const $loginElement = angular.element($element[0]);
      
      this.open = _ => {
        $loginElement.removeCLass('flx-closed');
        $loginElement.addClass('flx-open animated slideInUp');
      };

      this.close = _ => {
        $loginElement.addClass('animated slideInDown');
        $loginElement.removeClass('animated-open');
      };

    },
    link: function (scope, elem, attrs, controller) {

    },
    templateUrl: 'login.html'
  }
}
LoginDirective.$inject = ['$firebaseAuthService', '$location'];