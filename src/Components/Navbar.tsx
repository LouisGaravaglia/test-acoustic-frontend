import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';
import {IoClose} from 'react-icons/io5';

const Navbar: React.FC = () => {
  const [navbarActive, setNavbarActive] = useState<boolean>(false);
  const history = useHistory();

  function handleNavbarClick() {
    setNavbarActive(state => !state);
  }

  function handleLogoClick() {
    history.push('/');
  }

  const navbarSlideinJSX = (
    <div className='Navbar-Slide-Box'>
      <IoClose color='#ffd3be' className='Navbar-Slidein-Close' onClick={handleNavbarClick}/>
      <Link className='Navbar-Slidein-Link' to='/' onClick={handleNavbarClick}>Home</Link>
      <Link className='Navbar-Slidein-Link' to='/register' onClick={handleNavbarClick}>Register</Link>
      <Link className='Navbar-Slidein-Link' to='/login' onClick={handleNavbarClick}>Login</Link>
      <Link className='Navbar-Slidein-Link' to='/playlists' onClick={handleNavbarClick}>Playlists</Link>
    </div>
  )

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className='Navbar-Container'>
      {
        navbarActive ?
          <div className="Navbar-Slidein">
            {navbarSlideinJSX}
          </div>
        : 
          <div className="Navbar-Slideout">
            {navbarSlideinJSX}
          </div>
      }
      <div className='Navbar-Logo-Box'>
        <div className='Navbar-Logo' onClick={handleLogoClick}></div>
        <div className='Navbar-Link-Box'>
        <FaBars color='#181718' className='Navbar-Hamburger' onClick={handleNavbarClick}/>
      </div>
      </div>

    </div>
  );
};

export default Navbar;