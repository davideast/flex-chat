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
      compiledElement.css('display', 'none');
      body.append(compiledElement);
      return {
        $ctrl: modalController,
        $scope: modalScope,
        $element: compiledElement,
        show: function() {
          compiledElement.css('display', 'flex');
          compiledElement.removeClass('fadeOutDown');
          compiledElement.addClass('animated fadeInUp');
        },
        hide: function() {
          compiledElement.addClass('animated fadeOutDown');
          compiledElement.removeClass('fadeInUp');         
        }
      }
    });
  }
}