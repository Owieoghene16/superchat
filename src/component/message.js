import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/index';

const ChatBox = ({msg}) => {
  const [user] = useAuthState(auth);
  const messageClass = msg.data.userId === user?.uid ? 'msg right-msg' : 'msg left-msg';

  return (
    <>
      <div className={messageClass}>
        <div className='msg-img' style={{backgroundImage: `url(${msg.data.imageUrl})`}} />
        <div className='msg-bubble'>
          <div className='msg-text' >
            {msg.data.text}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
