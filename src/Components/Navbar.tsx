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
        <div className='Navbar-Links-Box'>
            <NavLink  className='Navbar-Login' exact to='/login'>LOGIN</NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;