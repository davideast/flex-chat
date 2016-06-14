export function FirebaseStorageDirective($firebaseStorage) {
  return {
    restrict: 'A',
    priority: 99, // run after the attributes are interpolated
    scope: {},
    link: function (scope, element, attrs) {
      // $observe is like $watch but it waits for interpolation 
      // Ex: <img gs-url="{{ myUrl }}"/> 
      attrs.$observe('gsUrl', function (newVal, oldVal) {
        if (newVal !== '') {
          const storageRef = firebase.storage().ref().child(attrs.gsUrl);
          const storage = $firebaseStorage(storageRef);
          storage.$getDownloadURL().then(url => {
            element[0].src = url;
          });          
        }
      });
    }
  }
}
FirebaseStorageDirective.$inject = ['$firebaseStorage'];