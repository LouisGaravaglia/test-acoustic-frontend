import React, {useEffect, useContext, useState} from 'react';
import ChattyDisplay from './ChattyDisplay';
import {MessagesContext} from './MessagesProvider';
import useSpotifyAuth from './helpers/useSpotifyAuth';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

function Chatty(): JSX.Element {
  const {displayedContent} = useContext(MessagesContext);
  const {isConfirmedCrossSiteAttack, handleSpotifyAuthenticationError, retrieveSpotifyAccessTokens} = useSpotifyAuth();
  const [firstLoad, setFirstLoad] = useState(false);
  const [authLogic, setAuthLogic] = useState(false);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const stateKey: string | null = params.get('state');
  const authorizationError: string | null = params.get('error');

////////////////////////////////////////////////////  LOGIC TO HANDLE AUTHENTICATION AND DISPLAY APPROPRIATE PREVIOUS CHATTY MESSAGES  ////////////////////////////////////////////////////

  function displayPreviousMessageHistory() {
    if (isConfirmedCrossSiteAttack()) return;

    if (authorizationError) {
      handleSpotifyAuthenticationError()
    } else {
      retrieveSpotifyAccessTokens();
    }
  }

////////////////////////////////////////////////////  RUN DISPLAYPREVIOUSMESSAGEHISTORY ON COMPONENT MOUNT CONDITIONALY  ////////////////////////////////////////////////////

  useEffect(() => {
    //IF STATEKEY IS TRUTHY THAN THE USER HAS ATTEMPTED TO AUTHENTICATE WITH SPOTIFY 
    //AND WE NEED TO DISPLAY WHERE HE/SHE LEFT OFF IN THE CHATTY CONVERSATION
    if (stateKey) {
      setAuthLogic(true);
      displayPreviousMessageHistory()
    //IF STATEKEY IS NULL THEN THE USER HASN'T ATTEMPTED TO AUTHENTICATE WITH SPOTIFY
    } else {
      setFirstLoad(true);
    }
  }, [stateKey])

////////////////////////////////////////////////////  RENDER LOADING SPINNER OR CHATTY  ////////////////////////////////////////////////////

  return (
    <>
      {(authLogic && !displayedContent.length) && <UseAnimations className='Chatty-Loading-Spinner' animation={loading} size={200} style={{ padding: 100 }} strokeColor='#37f8ff' />}
      {(firstLoad || displayedContent.length) && <ChattyDisplay/>}
    </>
  );
};

export default Chatty;