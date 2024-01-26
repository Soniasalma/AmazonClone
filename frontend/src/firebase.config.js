// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyACVcu_ou2Tayj1UtC0ZoxIh6XA7Qofyxs',
  authDomain: 'clone-941f6.firebaseapp.com',
  projectId: 'clone-941f6',
  storageBucket: 'clone-941f6.appspot.com',
  messagingSenderId: '105426386599',
  appId: '1:105426386599:web:975359425b18a539a32582',
  measurementId: 'G-XTQBGWQSBC',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
