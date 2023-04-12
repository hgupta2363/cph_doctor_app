import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD5K06hsQ5NM5PUVzgb3dMr6vBSGPll6XE',
  authDomain: 'cph-app-800ea.firebaseapp.com',
  projectId: 'cph-app-800ea',
  storageBucket: 'cph-app-800ea.appspot.com',
  messagingSenderId: '996974317374',
  appId: '1:996974317374:web:859668bcfaa7163036a66f',
  measurementId: 'G-1SY9V065K8',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const captchaVerifier = RecaptchaVerifier
export const signIn = signInWithPhoneNumber
