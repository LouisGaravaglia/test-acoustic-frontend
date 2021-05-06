import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';


const Navbar: React.FC = () => {
  const location = useLocation();
  const urlSlug = location.pathname;

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
    <div className='Navbar-Container'>    </div>
      <div className='Navbar-Container-Left'>
        <div className='Navbar-Logo-Box'>
            <NavLink  className='Navbar-Logo' exact to='/'><span className='Navbar-Logo-Circle'>A.IO</span></NavLink>
        </div>
      </div>
      <div className='Navbar-Container-Right'>
          <div className='Navbar-Link-Box'>
              <NavLink  className={urlSlug === "/" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/'>HOME</NavLink>
              <NavLink  className={urlSlug === "/register" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/register'>REGISTER</NavLink>
              <NavLink  className={urlSlug === "/playlists" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/playlists'>PLAYLISTS</NavLink>
              {/* <NavLink  className={urlSlug === "/login" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/login'>LOGIN</NavLink> */}
          </div>
      </div>
    </>
  );
};

export default Navbar;