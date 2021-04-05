import React, {useContext} from "react";
import {MessagesContext} from "../MessagesProvider";
import DisplayedButton from "../DisplayedButton";

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
  const SPOTIFY_AUTH_URL = 'https://acoustic-backend.herokuapp.com/authorizeSpotify?'
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
    addContentToBeDisplayed([<DisplayedButton buttonText={"What if I don't have Spotify?"}/>])
  }

  function proceedWithoutSpotify(buttonClicked: string) {
    if (buttonClicked === 'first') {
      incrementMessagingPhase(3)
    } else {
      incrementMessagingPhase(1)
    }
    addContentToBeDisplayed([<DisplayedButton buttonText={"Proceed without Spotify"}/>])
  }


////////////////////////////////////////////////////  BUTTONS ////////////////////////////////////////////////////

  const initialButtons: IButtonObj = {
    id: "b1",
    buttons: [
      <div className={'Chatty-Button-Box'}><button className={'Chatty-Button'} onClick={() => authenticateSpotify('button_clicked=first_button')}><p>Log into my Spotify</p></button></div>,
      <div className={'Chatty-Button-Box'}><button className={'Chatty-Button'} onClick={dontHaveSpotify}><p>What if I don't have Spotify?</p></button></div>
    ]
  };

  const proceedWithoutSpotifyButtons: IButtonObj = {
    id: "b2",
    buttons: [
      <div className={'Chatty-Button-Box'}><button className={'Chatty-Button'} onClick={() => authenticateSpotify('button_clicked=second_button')}><p>Log into my Spotify</p></button></div>,
      <div className={'Chatty-Button-Box'}><button className={'Chatty-Button'} onClick={() => proceedWithoutSpotify('first')}><p>Proceed without Spotify</p></button></div>
    ]
  };

  const tryAgainButtons: IButtonObj = {
    id: "b3",
    buttons: [
      <div className={'Chatty-Button-Box'}><button className={'Chatty-Button'} onClick={() => authenticateSpotify(`button_clicked=${stateKey}_second_attempt`)}><p>Try again</p></button></div>,
      <div className={'Chatty-Button-Box'}><button className={'Chatty-Button'} onClick={() => proceedWithoutSpotify('second')}><p>Proceed without Spotify</p></button></div>
    ]
  };

  return {
    initialButtons,
    proceedWithoutSpotifyButtons,
    tryAgainButtons
  };
};

export default useButtons;

