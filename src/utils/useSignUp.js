/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/index';
import { collection, addDoc } from 'firebase/firestore';

const useSignUp = () => {
  const dummy = useRef();
  const [user] = useAuthState(auth);
  const [image, setImage] = useState({});
  const [error, setError] = useState('');
  const [imageName, setImageName] = useState();
  const [formValue, setFormValue] = useState('');
  const storage = JSON.parse(sessionStorage.getItem('user'));

  const handleFormValue = (e) => {
    setFormValue(e.target.value);
  };

  const imageFile = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'messages'), {
        messageId: Math.random(),
        text: formValue,
        userId: user?.uid,
        username: storage.name,
        imageUrl: storage.imageUrl,
        createdAt: new Date(),
      });
      setFormValue('');
      console.log(dummy);
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    } catch(err) {
      alert(err);
      console.log(err);
    }
  };

  return {
    formValue,
    dummy,
    handleFormValue,
    sendMessage,
    image,
    imageFile,
    error,
    setError,
    imageName,
  };
};

export default useSignUp;
