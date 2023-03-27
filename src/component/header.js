import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { BiMessage, BiSearch } from 'react-icons/bi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useToggleSidebar from '../utils/useToggleSidebar';

const Header = ({chat, logout, link, store}) => {
  const {
    ref,
    open,
    checkNav,
    toggle,
    openNav,
    closeNav,
    handleClick,
  } = useToggleSidebar();
  const imageLink = store === null ? 'blank' : store.imageUrl;
  const userName = store === null ? 'blank' : store.name;

  return (
    <>
      <div className='sidebar-but-ton'>
          <i onClick={openNav}><AiOutlineMenu /></i>
          <span className='dash-board'>Owie Chatbox</span>
          <div id='mySidenav' className='si-de-nav' style={{width: toggle}} ref={checkNav}> 
            <Link onClick={closeNav} class='closebtn'>&times;</Link>
            <h3>Owie Chatbox</h3>
            <Link to='/chat'>Chat</Link>
            <Link to='/profile'>Profile</Link>
            <li onClick={logout}>Logout</li>
          </div>
      </div>
      <div className='sidebar-search'>
          <input type='text' placeholder='Search...' />
          <i class='fa-search' aria-hidden='true'><BiSearch /></i>
      </div>
      <div className='profile-details' onClick={handleClick} ref={ref}>
        <div className='msg-pics' style={{backgroundImage: `url(${imageLink})`}} />
          <span className='user-name'>{userName}</span>
          <i><RiArrowDropDownLine /></i>
            { open && (
              <div className='drop-down'>
                <ul>
                  <Link to={link}><li><i><BiMessage /></i>{chat}</li></Link>
                  <li onClick={logout}><i><CiLogout /></i>Log Out</li>
              </ul>
              </div>
            )}
      </div>
    </>
  )
};

export default Header;
