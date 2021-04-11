import React, {useContext} from 'react';
import {MessagesContext} from '../MessagesProvider';
import Backend from '../../../Backend';
import usePriorContent from './usePriorContent';

interface updateChattyProperties {
  priorChatContent: JSX.Element[]
  incrementVal: number
}
interface AccessTokenRequestProperties {
  code: string | null
  priorChatContent: JSX.Element[]
  errorVal: number
  successVal: number
}

interface TokenObj {
  access_token: string
  error: null | string
  expires_in: number
  refresh_token: string
  token_type: string
}

function useSpotifyAuth() {
  const {updateUser, incrementMessagingPhase, addContentToBeDisplayed, updateStakeKey, displayedContent} = useContext(MessagesContext);
  const {priorToFirstButton, priorToSecondButtton, priorToFirstButtonSecondAttempt, priorToSecondButtonSecondAttempt} = usePriorContent();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const code: string | null  = params.get('code');
  const stateKey: string | null = params.get('state');

////////////////////////////////////////////////////  CHECKING FOR CROSS SITE ATTACKS BY CONFIRMING STATEKEY IS VALID ////////////////////////////////////////////////////

  function isConfirmedCrossSiteAttack() {
    const validStateKeys = ['spotify_auth_first_button', 'spotify_auth_second_button', 'spotify_auth_first_button_second_attempt', 'spotify_auth_second_button_second_attempt']
    if (validStateKeys.indexOf(stateKey === null ? 'noStateKey' : stateKey) === -1) {
      //i'll probably want to add some kind of message saying ther was an error and then try again
      return true;
    }
    return false;
  }

////////////////////////////////////////////////////  HANDLING AUTHENTICATION ERROR  ////////////////////////////////////////////////////

  function handleSpotifyAuthenticationError() {
    if (stateKey === 'spotify_auth_first_button') {
      //AUTHENTICATION ERROR FROM FIRST LOG INTO SPOTIFY BUTTON CLICKED
      updateStakeKey('first_button')
      updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: priorToFirstButton, incrementVal: 4})
    } else if (stateKey === 'spotify_auth_second_button') {
      //AUTHENTICATION ERROR FROM SECOND LOG INTO SPOTIFY BUTTON CLICKED
      updateStakeKey('second_button')
      updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: priorToSecondButtton, incrementVal: 4})
    } else if (stateKey === 'spotify_auth_first_button_second_attempt') {
      //AUTHENTICATION ERROR FROM SECOND ATTEPMT FROM FIRST LOG INTO SPOTIFY BUTTON CLICKED
      updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: priorToFirstButtonSecondAttempt, incrementVal: 7})
    } else if (stateKey === 'spotify_auth_second_button_second_attempt') {
      //AUTHENTICATION ERROR FROM SECOND ATTEMPT FROM SECOND LOG INTO SPOTIFY BUTTON CLICKED
      updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: priorToSecondButtonSecondAttempt, incrementVal: 7})
    }
  }

////////////////////////////////////////////////////  AUTH SUCCESSFUL RETRIEVING ACCESS TOKENS  ////////////////////////////////////////////////////

  function retrieveSpotifyAccessTokens() {
    if (stateKey === 'spotify_auth_first_button') {
      //AUTH SUCCESSFULL AFTER FIRST SPOTIFY BUTTON CLICKED
      getAccessTokens({code, priorChatContent: priorToFirstButton, errorVal: 4, successVal: 8});
    } else if (stateKey === 'spotify_auth_second_button') {
      //AUTH SUCCESSFULL AFTER SECOND SPOTIFY BUTTON CLICKED
      getAccessTokens({code, priorChatContent: priorToSecondButtton, errorVal: 4, successVal: 8});
    } else if (stateKey === 'spotify_auth_first_button_second_attempt') {
      //AUTH SUCCESSFULL AFTER FIRST SPOTIFY BUTTON CLICKED BUT SECOND ATTEMPT WAS MADE
      getAccessTokens({code, priorChatContent: priorToFirstButtonSecondAttempt, errorVal: 7, successVal: 8});
    } else if (stateKey === 'spotify_auth_second_button_second_attempt') {
      //AUTH SUCCESSFULL AFTER SECOND SPOTIFY BUTTON CLICKED BUT SECOND ATTEMPT WAS MADE
      getAccessTokens({code, priorChatContent: priorToSecondButtonSecondAttempt, errorVal: 7, successVal: 8});
    }
  }

////////////////////////////////////////////////////  RENDER THE CORRECT PREVIOUS MESSAGES THE USER HAS ALREADY SEEN  ////////////////////////////////////////////////////

  function updateChattyToDisplayWhereUserLastLeftOff(updateChattyObj: updateChattyProperties) {
    addContentToBeDisplayed(updateChattyObj.priorChatContent)
    incrementMessagingPhase(updateChattyObj.incrementVal)
  }

////////////////////////////////////////////////////  GET ACCESS TOKENS FROM SPOTIFY TO BE ABLE TO GET USER SPOTIFY DATA  ////////////////////////////////////////////////////

  async function getAccessTokens(makeRequestObj: AccessTokenRequestProperties) {
      const tokenObj: TokenObj = await Backend.requestAccessTokens(makeRequestObj.code)
      //THERE IS GOING TO BE A REDIRECT TO CHATTY AFTER MAKING A REQUEST SO WE'LL NEED TO DISPLAY THE CHAT CONTENT THE USER HAS ALREADY SEEN,
      //OTHERWISE WE'D HAVE TO START THE CHAT OVER
      if (tokenObj.error) {
        //HANDLING ACCESS TOKEN REQUEST ERROR
        updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: makeRequestObj.priorChatContent, incrementVal: makeRequestObj.errorVal})
      } else {
        //HANDLING ACCESS TOKEN REQUEST SUCCESS
        updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: makeRequestObj.priorChatContent, incrementVal: makeRequestObj.successVal})
        updateUser('access_token', tokenObj.access_token)
        updateUser('refresh_token', tokenObj.refresh_token)
      }
  }

////////////////////////////////////////////////////  RETURN FUNCTIONS TO BE CALLED  ////////////////////////////////////////////////////

  return {
    getAccessTokens,
    updateChattyToDisplayWhereUserLastLeftOff,
    isConfirmedCrossSiteAttack,
    handleSpotifyAuthenticationError,
    retrieveSpotifyAccessTokens
  }
};

export default useSpotifyAuth;