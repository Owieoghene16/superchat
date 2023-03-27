import { initializeApp } from 'firebase/app';
import { 
  GoogleAuthProvider,
  getAuth,
  updateEmail,
  updatePassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import Config from './config';

const firebaseConfig = {
  apiKey: Config.apiKey,
  authDomain: Config.authDomain,
  projectId: Config.projectId,
  storageBucket: Config.storageBucket,
  messagingSenderId: Config.messagingSenderId,
  appId: Config.appId,
  measurementId: Config.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        imageUrl: '',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err, err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      imageUrl: '', 
    });
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const updateUserProfile = async (username) => {
  try {
    await updateEmail(auth.currentUser, username);
    alert('User details updated successfully')
  } catch(err) {
    alert('An error occured');
    console.log(err);
  }
};

const resetPassword = async (oldPassword, newPassword) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      oldPassword
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    alert('Password updated successfully')
  } catch(err) {
    console.log(err)
  }
};
const logOut = () => {
  signOut(auth);
  sessionStorage.removeItem('user');
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOut,
  resetPassword,
  updateUserProfile,
};
