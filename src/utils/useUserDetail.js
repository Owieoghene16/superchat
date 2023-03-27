import { useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase/index';
import FormData from 'form-data';
import { query, collection, getDocs, where, doc, updateDoc } from 'firebase/firestore';

const useUserDetail = () => {
  const [user] = useAuthState(auth);
  const [image, setImage] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [imageName, setImageName] = useState();
  const refresh = () => window.location.reload(true)

  const imageFile = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
    console.log(image);
  };

  const userInfo = async () => {
    const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    console.log(data, 'datttaaaa')
    sessionStorage.setItem('user', JSON.stringify(data));
  };

  const uploadPicture = async () => {
    try {
      let body = new FormData();
      body.set('key', '2e8abecd913d40cf0d93bfd193ff2e20')
      body.append('image', image)
      //query to my image api
      const response = await axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    });

    //query to the database
    console.log(user?.email, user?.uid)
    const q = query(collection(db, 'users'), where('email', '==', user?.email));
    const querySnapshot = await getDocs(q);
    let docID = '';
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });
    await updateDoc(doc(db, 'users', docID), { imageUrl: response.data.data.url });
    if (response.data.data.url) {
        userInfo();
      };
      refresh();
    } catch (err) {
      console.log(err);
      setErrorMessage('An error occured');
    }
  };

  return {
    user,
    image,
    imageFile,
    imageName,
    errorMessage,
    userInfo,
    uploadPicture,
    refresh,
  }
};

export default useUserDetail;
