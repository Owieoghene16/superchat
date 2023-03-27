import { useRef, useState, useEffect } from 'react';

const useToggleSidebar = () => {
  const ref = useRef();
  const checkNav = useRef();
  const [ open, setOpen ] = useState(false);
  const [toggle, setToggle] = useState('0%');

  const openNav = () => {
    setToggle('70%');
  };
  const closeNav = () => {
    setToggle('0%');
  };
  const handleClick = () => {
    setOpen(!open);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleNavbar = (event) => {
      if (!checkNav?.current?.contains(event.target)) {
        closeNav();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleNavbar);
  }, [ref, checkNav]);

  return {
    ref,
    checkNav,
    toggle,
    open,
    openNav,
    closeNav,
    handleClick,
  };
};

export default useToggleSidebar;
