import React from 'react';
import {NavLink} from 'react-router-dom';


const Navbar: React.FC = () => {



////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      <div className='Navbar-Container-Left'>
        <div className='Navbar-Logo-Box'>
            <NavLink  className='Navbar-Logo' exact to='/'><span className='Navbar-Logo-Circle'>A.IO</span></NavLink>
        </div>
      </div>
      <div className='Navbar-Container-Right'>

          {/* <div className='Navbar-Link-Box'>
              <NavLink  className='Navbar-Link' exact to='/login'>HOME</NavLink>
          </div>
          <div className='Navbar-Link-Box'>
              <NavLink  className='Navbar-Link' exact to='/login'>PROFILE</NavLink>
          </div> */}
          <div className='Navbar-Link-Box'>
              <NavLink  className='Navbar-Link' exact to='/'>HOME</NavLink>
              <NavLink  className='Navbar-Link' exact to='/profile'>PROFILE</NavLink>
              <NavLink  className='Navbar-Link' exact to='/login'>LOGIN</NavLink>
          </div>

      </div>
    </>
  );
};

export default Navbar;