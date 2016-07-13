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
  const inputBarShell = document.getElementById('flx-input-bar-shell');
  const $inputBarShell = angular.element(inputBarShell);
  const chatContainerShell = document.getElementById('flex-container-shell');
  const $chatContainerShell = angular.element(chatContainerShell);
  $headerShell.remove();
  $inputBarShell.remove();
  $chatContainerShell.remove();
}
ApplicationRun.$inject = ['$rootScope', '$location', '$route'];
