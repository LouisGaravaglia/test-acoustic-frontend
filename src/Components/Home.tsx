import React, {useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {MessagesContext} from './ChatBot/MessagesProvider';
import { IoIosArrowRoundForward } from 'react-icons/io';

   //eslint-disable-next-line react-hooks/exhaustive-deps
   
const Home: React.FC = () => {
  const {resetPhases} = useContext(MessagesContext);
  const history = useHistory();

  // useEffect(() => {
  //   const resetRegisterPhases = () => {
  //     resetPhases();
  //     // Backend.getCSRF();
  //   }
  //   resetRegisterPhases();
  //   //THE BELOW COMMENT IS TO DISREGARD TYPESCRIPT ERROR FOR NOT INCLUDING resetPhases AS DEPENDECNY, BECAUSE IF WE DID IT WOULD THROW AND INFINITE CALLBACK LOOP
 
  // }, []);

  function redirectToChatty() {
    history.push('/register')
  }

  return (
    <div className='Home-Container'>
  
        <div className='Home-Header-Box'>
          <h1>ACOUSTIGRAM.IO</h1>
          <h5>A Digital Companion to keep you up to date with the latest music releases.</h5>
        </div>

      <div className="Home-Lower-Container">
        <div className="Home-Button-Container">
          <div onClick={redirectToChatty} className="Home-Button-Box">
            <h1 className="Home-Button">Get Started</h1>
            <IoIosArrowRoundForward color='#181718' className='Home-Register-Arrow'/>
          </div>
        </div>
        <div className="Home-Login-Container">
        <div onClick={redirectToChatty} className="Home-Login-Box">
            <h1 className="Home-Login">Login</h1>
            <IoIosArrowRoundForward color='#181718' className='Home-Login-Arrow'/>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;