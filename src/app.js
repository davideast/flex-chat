import { ApplicationConfig, ApplicationRun, initializeFirebaseApp } from './config';
import { MessagesList, MessageDirective, flexchatComponent } from './messages';
import { FirebaseStorage, FirebaseStorageDirective, blobify } from './storage';
import { LoginDirective } from './login';
import { FileUploadDirective } from './common';
import { appComponent } from './app-component';

/*
 * Flexchat
 * ----------
 * An angular app demonstrating Firebase & Flexbox.
 */
const config = initializeFirebaseApp();

angular
  .module('flexchat', [
    'firebase',
    'ngRoute',
    'flexchat.templates'
  ])
  .constant('FirebaseUrl', config.databaseURL)
  .component('flexchatApp', appComponent())
  .component('flexchat', flexchatComponent())
  .factory('messagesList', MessagesList)
  .factory('blobify', blobify)
  .factory('$firebaseStorage', FirebaseStorage)
  .directive('flexchatMessage', MessageDirective)
  .directive('login', LoginDirective)
  .directive('fileUpload', FileUploadDirective)
  .directive('gsUrl', FirebaseStorageDirective)
  .config(ApplicationConfig)
  .run(ApplicationRun);

