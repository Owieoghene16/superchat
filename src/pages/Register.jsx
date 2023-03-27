/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate  } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillLockFill, BsFillPersonFill } from 'react-icons/bs';
// import { CgProfile } from 'react-icons/cg';
import { FiMail } from 'react-icons/fi';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle 
} from '../firebase/index';
import MyParticle from '../particles';
import '../assets/login.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, loading] = useAuthState(auth);
  const history = useNavigate();

  const register = (e) => {
    e.preventDefault();
    if (!username) setError('Please enter username');
    console.log(username, email, password);
    registerWithEmailAndPassword(username, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history('/chat');
  }, [user, loading]);

  return (
    <>
      <div>
        <div className='welcome'>
          <MyParticle />
            <div className='form-header'>
              <div className='form-value'>
                <form>
                  <h2>Register</h2>
                  <div className='signup_con'>
                    <button className='google' onClick={signInWithGoogle}>
                      <img alt='google' src='https://cdn-icons-png.flaticon.com/512/300/300221.png' />Google
                    </button>
                    <button className='facebook' onClick={signInWithGoogle}>
                      <img alt='facebook' src='https://cdn-icons-png.flaticon.com/512/5968/5968764.png' />Facebook
                    </button>
                  </div>
                  <span className='error-message'>{error}</span>
                  <p2>{error}</p2>
                  <div className='inputbox'>
                    <BsFillPersonFill className='icon' />
                    <input 
                      type='text' 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor>Username</label>
                  </div>
                  <div className='inputbox'>
                    <FiMail className='icon' />
                    <input 
                      type='text' 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                    <label htmlFor>Email</label>
                  </div>
                  <div className='inputbox'>
                    <BsFillLockFill className='icon' />
                    <input 
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                    <label htmlFor>Password</label>
                  </div>
                  <div className='forget'>
                    <label htmlFor><input type='checkbox' />Remember Me</label>
                    <Link href='#'>Forget Password</Link>
                  </div>
                  <button className='sign_up' onClick={register}>Sign up</button>
                  <div className='register'>
                    <p>Already have a account</p>
                    <Link to='/'>Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      <Outlet />
    </>
  );
};
   
export default Register;
