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
  const code: string | null  = params.get('code');
  const stateKey: string | null = params.get('state');
  const authorizationError: string | null = params.get('error');

  // function displayPreviousMessageHistory() {
  //   if (isConfirmedCrossSiteAttack()) return;

  //   if (authorizationError)  {
  //     handleSpotifyAuthenticationError()
  //   } else {
  //     retrieveSpotifyAccessTokens();
  //   }
  // }

  function displayPreviousMessageHistory() {
    if (isConfirmedCrossSiteAttack(stateKey)) return;

    if (authorizationError)  {
      handleSpotifyAuthenticationError(stateKey)
    } else {
      retrieveSpotifyAccessTokens(stateKey, code);
    }
  }
////////////////////////////////////////////////////  RUN DISPLAYPREVIOUSMESSAGEHISTORY ON COMPONENT MOUNT CONDITIONALY  ////////////////////////////////////////////////////

  useEffect(() => {
    //IF STATEKEY IS TRUTHY THAN THE USER HAS ATTEMPTED TO AUTHENTICATE WITH SPOTIFY AND WE NEED TO DISPLAY WHERE HE/SHE LEFT OFF IN THE CHATTY CONVERSATION
    if (stateKey) {
      setAuthLogic(true);
      displayPreviousMessageHistory()
    //IF STATEKEY IS NULL THEN THE USER HASN'T ATTEMPTED TO AUTHENTICATE WITH SPOTIFY
    } else {
      setFirstLoad(true);
    }
    //THE BELOW COMMENT IS TO DISREGARD TYPESCRIPT ERROR FOR NOT INCLUDING incrementMessagingPhase AS DEPENDECNY, BECAUSE IF WE DID IT WOULD THROW AND INFINITE CALLBACK LOOP
    // eslint-disable-next-line
  }, [stateKey, authorizationError])

  return (
    <>
      {(authLogic && !displayedContent.length) && <UseAnimations className='Chatty-Loading-Spinner' animation={loading} size={200} style={{ padding: 100 }} strokeColor='#37f8ff' />}
      {(firstLoad || displayedContent.length) && <ChattyDisplay/>}
    </>
  );
};

export default Chatty;