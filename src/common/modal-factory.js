export function ModalFactory($templateRequest, $compile, $document, $controller) {
  return function modalFactory(options) {
    const body = angular.element($document[0].body);
    const template = $templateRequest(options.templateUrl);
    return template.then(content => {
      const compiledElement = $compile(content)(options.scope);
      const inputs = {
        $scope: options.scope
      };
      const modalController = $controller(options.controller, inputs, false, '$ctrl');
      compiledElement.addClass('flx-closed');
      body.append(compiledElement);
      return {
        $ctrl: modalController,
        $scope: options.scope,
        $element: compiledElement,
        show: function() {
          compiledElement.removeClass('flx-closed slideOutDown');
          compiledElement.addClass('flx-open animated slideInUp');
        },
        hide: function() {
          compiledElement.addClass('animated slideOutDown');
          compiledElement.removeClass('flx-open slideInUp');
        }
      }
    });
  }
}