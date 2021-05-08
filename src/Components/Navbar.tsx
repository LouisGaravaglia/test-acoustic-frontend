import React, {useState} from 'react';
import {NavLink, useLocation, Link} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Navbar: React.FC = () => {
  const [navbarActive, setNavbarActive] = useState<boolean>(false);
  const location = useLocation();
  const urlSlug = location.pathname;

  function handleNavbarClick() {
    setNavbarActive(state => !state);
  }

  const nabarSlideinJSX = (
    <>
      <IoClose color='#ffe0d7' className='Navbar-Slidein-Close' onClick={handleNavbarClick}/>
      <Link className='Navbar-Slidein-Link' to='/' onClick={handleNavbarClick}>Home</Link>
      <Link className='Navbar-Slidein-Link' to='/register' onClick={handleNavbarClick}>Register</Link>
      <Link className='Navbar-Slidein-Link' to='/login' onClick={handleNavbarClick}>Login</Link>
      <Link className='Navbar-Slidein-Link' to='/playlists' onClick={handleNavbarClick}>Playlists</Link>
      {/* <p className='Navbar-Slidein-Link'>Home</p>
      <p className='Navbar-Slidein-Link'>Register</p>
      <p className='Navbar-Slidein-Link'>Login</p>
      <p className='Navbar-Slidein-Link'>Playlists</p> */}
    </>
  )

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className='Navbar-Container'>

    {navbarActive
      ?
        <div className="Navbar-Slidein">
          {nabarSlideinJSX}
        </div>
      : 
        <div className="Navbar-Slideout">
          {nabarSlideinJSX}
        </div>
    }

    <div className='Navbar-Box'>
      
      {/* <div className="Navbar-Slideout" style={{marginLeft: navbarActive ? '-50px' : 'calc(-100vw - 50px)'}}></div> */}

      <div className='Navbar-Container-Right'>
          <div className='Navbar-Link-Box'>
            <FaBars color='#181718' className='Navbar-Hamburger' onClick={handleNavbarClick}/>
              {/* <NavLink  className={urlSlug === "/" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/'>HOME</NavLink>
              <NavLink  className={urlSlug === "/register" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/register'>REGISTER</NavLink>
              <NavLink  className={urlSlug === "/playlists" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/playlists'>PLAYLISTS</NavLink> */}
              {/* <NavLink  className={urlSlug === "/login" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/login'>LOGIN</NavLink> */}
          </div>
      </div>
      </div>
    </div>
  );
};

export default Navbar;