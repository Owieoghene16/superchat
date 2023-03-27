/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import MyParticle from '../particles/index';
import Header from '../component/header';
import ChatBox from '../component/message';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, logOut } from '../firebase/index';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';
import useSignUp from '../utils/useSignUp';
import useUserDetail from '../utils/useUserDetail';
import '../assets/chat.css';

const Chat = () => {
  const [user, loading] = useAuthState(auth);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const storage = JSON.parse(sessionStorage.getItem('user'));

  const {
    userInfo,
  } = useUserDetail();

  const {
    formValue,
    dummy,
    handleFormValue,
    sendMessage,
  } = useSignUp();

  useEffect(() => {
    userInfo();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
    console.log(user.photoURL, 'user', user.currentUser, user);
  }, [user, loading]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      setChats(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })).splice(0, 25).reverse())
    })
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  },[])

  return (
    <>
    <div className='container'>
    <MyParticle />
    <section className='msger-cont'>
      <header className='msger-header'>
        <Header 
          chat={'Profile'}
          link={'/profile'}
          logout={logOut}
          store={storage}
        />
      </header>
      <main className='msger-chat'>
        {
          chats.map(chat => 
            <ChatBox 
              key={chat.id}
              msg={chat}
            />
          )
        }
        <span ref={dummy}></span>
      </main>
      <form className='msger-inputarea'>
        <input 
          type='text' 
          className='msger-input' 
          placeholder='Enter your message...'
          name='message'
          value={formValue}
          onChange={handleFormValue}
        />
        <button type='submit' className='msger-send-btn' onClick={sendMessage}>Send</button>
      </form>
    </section>
    </div>
    </>
  );
};

export default Chat;
