export class MessageBlobService {
  
  constructor($firebaseStorage, $firebaseRef) {
    this.$firebaseStorage = $firebaseStorage;
    this.$firebaseRef = $firebaseRef;
  }

  isImage(file) {
    return !!file && !!file.type.match(/image.*/);
  }

  addBlobMessage(message) {
    const rootStorageRef = firebase.storage().ref();
    const messageStorageRef = rootStorageRef.child('messages');    
    const filePresent = this.isImage(message.file);
    const messagesRef = this.$firebaseRef.messages;
    const newMessageRef = messagesRef.push();

    if (filePresent) {
      const storage = this.$firebaseStorage(messageStorageRef.child(newMessageRef.key));
      const task = storage.$put(message.file);
      task.$complete(snap => {
        newMessageRef.set({
          text: message.text,
          hasImage: filePresent,
          uid: message.uid,
          displayName: message.displayName,
          photoURL: message.photoURL,
        });
      });
      task.$error(err => console.error(err));
    } else {
      newMessageRef.set({
        text: message.text,
        hasImage: filePresent,
        uid: message.uid,
        displayName: message.displayName,
        photoURL: message.photoURL
      });
    }
  }

}
MessageBlobService.$inject = ['$firebaseStorage', '$firebaseRef'];