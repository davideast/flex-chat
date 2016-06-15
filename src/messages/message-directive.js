/*
 * Flexchat Message
 * --------------
 * element: <flexchat-message message=""></flexchat-message>
 * properties: Message { text: string, uid: string }
 */
export function MessageDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: { message: '=' },
    controllerAs: '$ctrl',
    controller: () => { },
    link: (scope, elem, attrs) => {
      //elem[0].scrollIntoView();
    },
    templateUrl: 'message.html'
  }
}
