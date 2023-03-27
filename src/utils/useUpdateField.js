import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth, updateUserProfile , resetPassword} from '../firebase/index';
import { query, collection, getDocs, where, doc, updateDoc } from 'firebase/firestore';
import useUserDetail from './useUserDetail';

const useUpdateField = () => {
  const [error, setError] = useState('');
  const [form, setForm] = useState({});
  const [user] = useAuthState(auth);
  const {
    userInfo,
  } = useUserDetail();

  const formField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const updateUser = async () => {
    try {
      //query to the database
      const q = query(collection(db, 'users'), where('email', '==', user?.email));
      const querySnapshot = await getDocs(q);
      let docID = '';
      querySnapshot.forEach((doc) => {
        docID = doc.id;
      });
      await updateDoc(doc(db, 'users', docID), {
        name: form.username, 
        email: form.email,
      });
      updateUserProfile(form.email);
      setError('Uploaded Succesfully');
      sessionStorage.removeItem('user');
      userInfo();
    } catch (err) {
      console.log(err);
      setError('Server not connecting');
    }
  }

  const updatePassword = () => {
    if(form.newPassword !== form.confirmPassword) {
      setError(`Password doesn't match`)
    } else {
      resetPassword(form.oldPassword, form.newPassword);
    }
  }

  return {
    form,
    error,
    formField,
    updateUser,
    updatePassword,
  }
};

export default useUpdateField;
