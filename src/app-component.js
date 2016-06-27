/*
 * App
 * --------------
 * element: <app></app>
 */
export function appComponent() {
  return {
    bindings: { user: '<', messages: '<', redirectResult: '<' },
    controller: function () {},
    templateUrl: 'app.html'
  }
}