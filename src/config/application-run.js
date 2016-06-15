export function ApplicationRun($rootScope, $location, $route) {
  const original = $location.path;
  
  $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
  
  // // HACK:
  // $location.path = function (path, reload) {
  //   if (reload === false) {
  //     const lastRoute = $route.current;
  //     const un = $rootScope.$on('$locationChangeSuccess', function () {
  //       $route.current = lastRoute;
  //       un();
  //     });
  //   }
  //   return original.apply($location, [path]);
  // };
}
ApplicationRun.$inject = ['$rootScope', '$location', '$route'];
