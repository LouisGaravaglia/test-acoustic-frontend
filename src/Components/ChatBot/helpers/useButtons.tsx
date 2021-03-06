import React, {useContext} from 'react';
import {MessagesContext} from '../MessagesProvider';
import ButtonsPast from '../Buttons/ButtonsPast';

interface IButtonObj {
  id: string
  buttons: JSX.Element[]
}

// type Hook = () => {
//   initialButtons: IButtonObj
//   proceedWithoutSpotifyButtons: IButtonObj
//   tryAgainButtons: IButtonObj
// };

//A FUNCTION THAT RETURNS VARIABLES OF JSX ELEMENTS TO BE USED AS BUTTONS A USER CAN CLICK
function useButtons() {
  const SPOTIFY_AUTH_URL = 'https://acoustigram-backend.herokuapp.com/authorizeSpotify?'
  // const SPOTIFY_AUTH_URL = process.env.REACT_APP_SPOTIFY_AUTH_ROUTE || 'http://127.0.0.1:8000/authorizeSpotify?';
  const {addContentToBeDisplayed, incrementMessagingPhase, stateKey, displayLoadingSpinner} = useContext(MessagesContext);

////////////////////////////////////////////////////  ON CLICK FUNCTIONS FOR BUTTONS ////////////////////////////////////////////////////

  function authenticateSpotify(param: string) {
    displayLoadingSpinner();
    window.location.href = SPOTIFY_AUTH_URL + param;
    return null;
  }

  function dontHaveSpotify() {
    incrementMessagingPhase(1)
    addContentToBeDisplayed([<ButtonsPast buttonText={`Do I have to?`}/>])
  }

  function proceedWithoutSpotify(buttonClicked: string) {
    if (buttonClicked === 'first') {
      incrementMessagingPhase(3)
    } else {
      incrementMessagingPhase(1)
    }
    addContentToBeDisplayed([<ButtonsPast buttonText={'Proceed without Spotify'}/>])
  }


////////////////////////////////////////////////////  BUTTONS ////////////////////////////////////////////////////

  const initialButtons: IButtonObj = {
    id: 'b1',
    buttons: [
      <div className='Chatty-Button-Box' onClick={() => authenticateSpotify('button_clicked=first_button')}><div className='Chatty-Button' ><p>Log into my Spotify</p></div></div>,
      <div className='Chatty-Button-Box' onClick={dontHaveSpotify}><div className='Chatty-Button'><p>Do I have to?</p></div></div>
    ]
  };

  const proceedWithoutSpotifyButtons: IButtonObj = {
    id: 'b2',
    buttons: [
      <div className='Chatty-Button-Box' onClick={() => authenticateSpotify('button_clicked=second_button')}><div className='Chatty-Button'><p>Log into my Spotify</p></div></div>,
      <div className='Chatty-Button-Box' onClick={() => proceedWithoutSpotify('first')}><div className='Chatty-Button'><p>Proceed without Spotify</p></div></div>
    ]
  };

  const tryAgainButtons: IButtonObj = {
    id: 'b3',
    buttons: [
      <div className='Chatty-Button-Box' onClick={() => authenticateSpotify(`button_clicked=${stateKey}_second_attempt`)}><div className='Chatty-Button'><p>Try again</p></div></div>,
      <div className='Chatty-Button-Box' onClick={() => proceedWithoutSpotify('second')}><div className='Chatty-Button'><p>Proceed without Spotify</p></div></div>
    ]
  };

  return {
    initialButtons,
    proceedWithoutSpotifyButtons,
    tryAgainButtons
  };
};

export default useButtons;

