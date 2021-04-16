import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';


const Navbar: React.FC = () => {
  const location = useLocation();

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      <div className='Navbar-Container-Left'>
        <div className='Navbar-Logo-Box'>
            <NavLink  className='Navbar-Logo' exact to='/'><span className='Navbar-Logo-Circle'>A.IO</span></NavLink>
        </div>
      </div>
      <div className='Navbar-Container-Right'>
          <div className='Navbar-Link-Box'>
              <NavLink  className={location.pathname === "/" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/'>HOME</NavLink>
              <NavLink  className={location.pathname === "/profile" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/profile'>PROFILE</NavLink>
              <NavLink  className={location.pathname === "/login" ? 'Navbar-Link-Active' : 'Navbar-Link'} exact to='/login'>LOGIN</NavLink>
          </div>
      </div>
    </>
  );
};

export default Navbar;