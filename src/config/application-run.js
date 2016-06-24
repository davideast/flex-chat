export function ApplicationRun($rootScope, $location, $route) {
  const original = $location.path;
  
  $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}
ApplicationRun.$inject = ['$rootScope', '$location', '$route'];
