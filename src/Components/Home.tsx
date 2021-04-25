import React, {useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {MessagesContext} from './ChatBot/MessagesProvider';
   //eslint-disable-next-line react-hooks/exhaustive-deps
   
const Home: React.FC = () => {
  const {resetPhases} = useContext(MessagesContext);
  const history = useHistory();

  useEffect(() => {
    const resetRegisterPhases = () => {
      resetPhases();
      // Backend.getCSRF();
    }
    resetRegisterPhases();
    //THE BELOW COMMENT IS TO DISREGARD TYPESCRIPT ERROR FOR NOT INCLUDING resetPhases AS DEPENDECNY, BECAUSE IF WE DID IT WOULD THROW AND INFINITE CALLBACK LOOP
 
  }, []);

  function redirectToChatty() {
    history.push('/register')
  }

  return (
    <div className='Home-Container'>
      <div className='Home-Upper-Box'>
        <div className='Home-Header-Box'>
          <h1>ACOUSTIC.IO</h1>
        </div>
        <div className='Home-Subheader-Box'>
          <h5>A DIGITAL COMPANION TO KEEP YOU UP TO DATE WITH THE LATEST MUSIC RELEASES</h5>
        </div>
      </div>
      <div className='Home-Lower-Box'>
      <div className="Playlists-All-Sort-Container">
            <div className="Playlists-All-Sort-Box">
              <div className="Playlists-All-Sort-Overlay"></div>
              <h1 className="Playlists-All-Sort">Get Started</h1>
            </div>
          </div>
        {/* <button className='home-main-button'>GET STARTED</button> */}
        {/* <button className='home-transition-element' onClick={redirectToChatty}>GET STARTED</button> */}
      </div>
    </div>
  );
};

export default Home;