/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../firebase/index';
import { BsFillLockFill } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';
import MyParticle from '../particles/index';
import '../assets/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  
  const login = (e) => {
    e.preventDefault();
    if (!email || !password) setError('Fill the Form');
    logInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/chat');
  }, [user, loading]);

  return (
    <>
      <div>
        <div className='welcome'>
          <MyParticle/>
            <div className='form-box'>
              <div className='form-value'>
                <form>
                  <h2>Login</h2>
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
                    <FiMail className='icon' />
                    <input 
                      type='text' 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                    <label>Email</label>
                  </div>
                  <div className='inputbox'>
                    <BsFillLockFill className='icon' />
                    <input 
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                    <label>Password</label>
                  </div>
                  <div className='forget'>
                    <label htmlFor><input type='checkbox' />Remember Me</label>
                    <Link href='#'>Forget Password</Link>
                  </div>
                  <button className='sign_up' onClick={login}>Log In</button>
                  <div className='register'>
                    <p>Don't have a account</p>
                    <Link to='/signup'>Register</Link>
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
   
export default Login;