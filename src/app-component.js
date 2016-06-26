/*
 * App
 * --------------
 * element: <app></app>
 */
export function appComponent() {
  return {
    bindings: { user: '<', messages: '<' },
    controller: function () {},
    templateUrl: 'app.html'
  }
}