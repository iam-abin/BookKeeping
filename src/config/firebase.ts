import { FirebaseApp, initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { config } from './config';

interface IFirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

const firebaseConfig: Readonly<IFirebaseConfig> = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const myFirebaseStorage: FirebaseStorage = getStorage(app);

export { myFirebaseStorage };
