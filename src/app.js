/*
 * Flexchat
 * ----------
 * An angular app demonstrating Firebase & Flexbox.
 */

import { ApplicationConfig, ApplicationRun, initializeFirebaseApp } from './config';
import { MessagesList, messageComponent, MessageBlobService, flexchatComponent } from './messages';
import { FirebaseStorage, FirebaseStorageDirective } from './storage';
import { LoginDirective } from './login';
import { FileUploadDirective, ModalFactory, body } from './common';
import { currentUser, twitterUser } from './auth';
import { appComponent } from './app-component';

const config = initializeFirebaseApp();

angular
  .module('flexchat', [
    'firebase',
    'ngRoute',
    'flexchat.templates'
  ])
  .constant('firebase', firebase)
  .constant('FirebaseUrl', config.databaseURL)
  .component('app', appComponent())
  .component('flexchat', flexchatComponent())
  .component('flexchatMessage', messageComponent())
  .factory('messagesList', MessagesList)
  .factory('modalFactory', ModalFactory)
  .factory('body', body)
  .factory('currentUser', currentUser)
  .factory('twitterUser', twitterUser)
  .service('messageBlob', MessageBlobService)
  .factory('$firebaseStorage', FirebaseStorage)
  .directive('login', LoginDirective)
  .directive('fileUpload', FileUploadDirective)
  .directive('gsUrl', FirebaseStorageDirective)
  .config(ApplicationConfig)
  .run(ApplicationRun);

