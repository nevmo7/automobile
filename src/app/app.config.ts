import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//firestore database config information
const firebaseConfig = {
    apiKey: "AIzaSyBaj_0c3vmjkxo2cxLRILLxxCOsQA8hufY",
    authDomain: "automobile-6baa5.firebaseapp.com",
    projectId: "automobile-6baa5",
    storageBucket: "automobile-6baa5.appspot.com",
    messagingSenderId: "700697702616",
    appId: "1:700697702616:web:ee4fcfe2b139313bfe27ad"
};

//initializes firebase
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
