export function ModalFactory($templateRequest, $compile, body, $controller, $rootScope) {
  return function modalFactory(options) {
    const template = $templateRequest(options.templateUrl);
    return template.then(content => {
      const modalScope = $rootScope.$new();
      const compiledElement = $compile(content)(modalScope);
      const inputs = {
        $scope: modalScope
      };
      const modalController = $controller(options.controller, inputs, false, '$ctrl');
      compiledElement.addClass('flx-closed');
      body.append(compiledElement);
      return {
        $ctrl: modalController,
        $scope: modalScope,
        $element: compiledElement,
        show: function() {
          compiledElement.removeClass('flx-closed fadeOutDown');
          compiledElement.addClass('flx-open animated fadeInUp');
        },
        hide: function() {
          compiledElement.addClass('animated fadeOutDown');
          compiledElement.removeClass('flx-open fadeInUp');
        }
      }
    });
  }
}