/*
 * Flexchat
 * --------------
 * element: <flexchat></flexchat>
 * dependencies: $firebaseArray
 */
export function flexchatComponent() {
  return {
    bindings: { messages: '<' },
    controller: function ($firebaseStorage, $firebaseRef, blobify) {
      const rootStorageRef = firebase.storage().ref();
      const messageStorageRef = rootStorageRef.child('messages');

      this.messageText = '';
      this.isImage = (file) => {
        return !!file && !!file.type.match(/image.*/);
      };

      function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return { width: srcWidth * ratio, height: srcHeight * ratio };
      }

      this.addMessage = (event) => {
        if (event.keyCode && event.keyCode !== 13) { return; }
        const filePresent = this.isImage(this.fileUpload);
        const messagesRef = $firebaseRef.messages;
        const newMessageRef = messagesRef.push();
        
        if (filePresent) {
          const storage = $firebaseStorage(messageStorageRef.child(newMessageRef.key));
          const task = storage.$put(this.fileUpload);
          task.$complete(snap => {
            newMessageRef.set({
              text: this.messageText,
              hasImage: filePresent
            });
            // clear out text and uploaded image
            this.messageText = '';
            this.fileUpload = null;
          });
          task.$error(err => console.error(err));
        } else {
          newMessageRef.set({
            text: this.messageText,
            hasImage: filePresent
          });
          this.messageText = '';
        }
      };
      this.onChange = (fileList) => {
        this.fileUpload = fileList[0];
      };      
    },
    templateUrl: 'chat.html'
  };
}