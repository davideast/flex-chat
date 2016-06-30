export function currentUser(firebase) {
  return firebase.auth().currentUser;
}
currentUser.$inject = ['firebase'];