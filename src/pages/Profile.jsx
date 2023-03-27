import React, { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logOut } from '../firebase/index';
import MyParticle from '../particles/index';
import { useNavigate } from 'react-router-dom';
import Header from '../component/header';
import useUserDetail from '../utils/useUserDetail';
import useUpdateField from '../utils/useUpdateField';
import '../assets/profile.css';

const Profile = () => {
  const { 
    error,
    formField,
    updateUser,
    updatePassword,
  } = useUpdateField();
  const {
    imageFile,
    imageName,
    userInfo,
    uploadPicture,
    errorMessage,
  } = useUserDetail();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    userInfo();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading]);

  const storage = JSON.parse(sessionStorage.getItem('user'));
  const imageLink = storage === null ? 'blank' : storage.imageUrl;

  return (
    <>
      <div className='container'>
        <MyParticle />
        <section className='msger-cont'>
          <header className='msger-header'>
            <Header 
              chat={'Chat'}
              link={'/chat'}
              logout={logOut}
              store={storage}
            />
          </header>
          <main className='msger-chat'>
            <div className='profile-pic'>
              <h2>Profile</h2>
            </div>
            <div className='profile-head'>
              <h2>Add A Profile Picture</h2>
            </div>
            <span className='error-message'>{errorMessage}</span>
            <div className='profile-cont'>
              <div className='image-upload'>
                <label className='label-con' for='file-input'>
                  <i className='icon'><AiOutlinePlus/></i>
                </label>
                <input
                  onChange={imageFile}
                  id='file-input'
                  type='file'
                />
                <div className='img-name'>
                  <p>{imageName}</p>
                </div>
              </div>
              <div className='user-image' style={{backgroundImage: `url(${imageLink})`}}>
              </div>
            </div>
            <div className='saves'>
              <button onClick={uploadPicture}>Update</button>
            </div>
            <div className='profile-head'>
              <h2>Update User Information</h2>
            </div>
            <div className='username-cont'>
              <h4>Personal Information</h4>
            </div>
            <span className='error-message'>{error}</span>
            <div className='username-field'>
              <div className='user-in'>
                <p2>Username</p2>
                <div className='user-input'>
                  <input 
                    type='text'
                    name='username'
                    defaultValue={storage.name}
                    onChange={formField}
                  />
                </div>
              </div>
              <div className='user-in'>
                <p2>Email</p2>
                <div className='user-input'>
                  <input 
                    type='text'
                    defaultValue={storage.email}
                    name='email'
                    onChange={formField}
                  />
                </div>
              </div>
            </div>
            <div className='saves'>
              <button onClick={updateUser}>Update</button>
            </div>
            <div className='border'>
            </div>
            <div className='username-cont'>
              <h4>Password Information</h4>
            </div>
            <span className='error-message'>{error}</span>
            <div className='username-field'>
              <div className='user-in'>
                <p2>Old Password</p2>
                <div className='user-input'>
                  <input 
                    type='password'
                    name='oldPassword'
                    onChange={formField}
                  />
                </div>
              </div>
            </div>
            <div className='username-field'>
              <div className='user-in'>
                <p2>New Password</p2>
                <div className='user-input'>
                  <input 
                    type='password'
                    name='newPassword'
                    onChange={formField}
                  />
                </div>
              </div>
              <div className='user-in'>
                <p2>Confirm Password</p2>
                <div className='user-input'>
                  <input 
                    type='password'
                    name='confirmPassword'
                    onChange={formField}
                  />
                </div>
              </div>
            </div>
            <div className='saves'>
              <button onClick={updatePassword}>Update</button>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default Profile;
