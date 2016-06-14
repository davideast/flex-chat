export function FileUploadDirective() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      onChange: '='
    },
    template: `
      <input type="file" name="file" id="firebase-storage-file" class="inputfile" />
      <label for="firebase-storage-file"><ng-transclude></ng-transclude></label>
    `,
    link: function (scope, element, attrs) {
      element.bind('change', function () {
        scope.onChange(Array.from(element.children()[0].files));
      });
    }
  }
}