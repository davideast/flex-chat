export function ApplicationRun($rootScope, $location, $route) {
  const original = $location.path;
  
  $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });


  // Hide app shell header
  const headerShell = document.getElementById('flex-header-shell');
  const $headerShell = angular.element(headerShell);
  $headerShell.remove();

}
ApplicationRun.$inject = ['$rootScope', '$location', '$route'];
