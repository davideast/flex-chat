/*
 * $firebaseStorage()
 * --------------
 */

export function FirebaseStorage() {

  return function FirebaseStorage(storageRef) {
    _assertStorageRef(storageRef);
    return {
      $put: function (file) {
        return $put(storageRef, file);
      },
      $getDownloadURL: function () {
        return $getDownloadURL(storageRef);
      }
    };
  }

}

export function unwrapStorageSnapshot(storageSnapshot) {
  return {
    bytesTransferred: storageSnapshot.bytesTransferred,
    downloadURL: storageSnapshot.downloadURL,
    metadata: storageSnapshot.metadata,
    ref: storageSnapshot.ref,
    state: storageSnapshot.state,
    task: storageSnapshot.task,
    totalBytes: storageSnapshot.totalBytes
  };
}

export function $put(storageRef, file) {
  const task = storageRef.put(file);

  return {
    $progress: function (callback) {
      task.on('state_changed',
        storageSnap => callback(unwrapStorageSnapshot(storageSnap)),
        err => { },
        storageSnap => { }
      );
    },
    $error: function (callback) {
      task.on('state_changed',
        storageSnap => { },
        err => callback(err),
        storageSnap => { }
      );
    },
    $complete: function (callback) {
      task.on('state_changed',
        storageSnap => { },
        err => { },
        _ => callback(unwrapStorageSnapshot(task.snapshot))
      );
    }
  };
}

export function $getDownloadURL(storageRef) {
  return storageRef.getDownloadURL();
}

export function isStorageRef(value) {
  value = value || {};
  return typeof value.put === 'function';
}

export function _assertStorageRef(storageRef) {
  if (!isStorageRef(storageRef)) {
    throw new Error('$firebaseStorage expects a storage reference from firebase.storage().ref()');
  }
}