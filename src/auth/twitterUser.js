export function twitterUser() {
  const PROVIDER_ID = 'twitter.com';
  return function getTwitterUser() {
    const currentUser = firebase.auth().currentUser;
    
    // check for user
    if (currentUser) {
      const userInfo = firebase.auth().currentUser.providerData[0];
      // check for info
      if (userInfo) {
        return {
          photoURL: userInfo.photoUrl,
          displayName: userInfo.displayName    
        }
      }
    }
    return null;
  }
}