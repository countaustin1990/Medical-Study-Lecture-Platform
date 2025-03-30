import  { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDVLcgX0tlB0QU7txxGS7YaGW_p4oZMdgQ",
  authDomain: "medlecture-platform.firebaseapp.com",
  projectId: "medlecture-platform",
  storageBucket: "medlecture-platform.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef123456"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
 