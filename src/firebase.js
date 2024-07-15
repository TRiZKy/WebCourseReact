import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCR8MHzAM3I2HVPz6hTOwPjjBnmheVFWXA",
  authDomain: "agriplatform-cf796.firebaseapp.com",
  projectId: "agriplatform-cf796",
  storageBucket: "agriplatform-cf796.appspot.com",
  messagingSenderId: "615921453000",
  appId: "1:615921453000:web:57fea7107bb91630a222fd",
  measurementId: "G-BP108DHY03"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
