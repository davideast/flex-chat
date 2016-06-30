export function twitterUser(currentUser, $firebaseRef) {
  const PROVIDER_ID = 'twitter.com';

  function save() {
    if (!currentUser) {
      throw new Error('twitterUser().save(): No user currently exists.');
    }
    const userInfo = firebase.auth().currentUser.providerData[0];
    if (userInfo) {
      $firebaseRef.child('users').child(currentUser.uid).update(userInfo);
    }
  }

  return function getTwitterUser() {    
    // check for user
    if (currentUser) {
      const userInfo = firebase.auth().currentUser.providerData[0];
      // check for info
      if (userInfo) {
        let photoURL = userInfo.photoURL;
        // replace http with https if photoURL exists
        if (photoURL) {
          photoURL = photoURL.replace('http', 'https');
        }
        
        return {
          photoURL: photoURL,
          displayName: userInfo.displayName    
        }
      }
    }
    return null;
  }
}
twitterUser.$inject = ['currentUser', '$firebaseRef'];