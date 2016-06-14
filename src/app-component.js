/*
 * App
 * --------------
 * element: <app></app>
 */
export function appComponent() {
  return {
    bindings: { authData: '<' },
    controller: function (messagesList) {
      this.messages = messagesList;
    },
    templateUrl: 'app.html'
  }
}