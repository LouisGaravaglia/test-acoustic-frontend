import React, {useEffect, useContext, useState} from "react";
import ChattyDisplay from "./ChattyDisplay";
import {MessagesContext} from "./MessagesProvider";
import usePriorContent from "./helpers/usePriorContent";
import useSpotifyAuth from "./helpers/useSpotifyAuth";
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading'

function Chatty(): JSX.Element {
  const {updateStakeKey} = useContext(MessagesContext);
  const {priorToFirstButton, priorToSecondButtton, priorToFirstButtonSecondAttempt, priorToSecondButtonSecondAttempt} = usePriorContent();
  const {getAccessTokens, updateChattyToDisplayWhereUserLastLeftOff} = useSpotifyAuth();
  const [priorContentLoaded, setPriorContentLoaded] = useState(false);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const code: string | null  = params.get('code');
  const stateKey: string | null = params.get('state');
  const authorizationError: string | null = params.get('error');
  console.log("code: ", code);
  console.log("stateKey: ", stateKey);
  console.log("error: ", authorizationError);

  async function displayPreviousMessageHistory() {

////////////////////////////////////////////////////  CHECKING FOR CROSS SITE ATTACKS BY CONFIRMING STATEKEY IS VALID ////////////////////////////////////////////////////  

    const validStateKeys = ["spotify_auth_first_button", "spotify_auth_second_button", "spotify_auth_first_button_second_attempt", "spotify_auth_second_button_second_attempt"]
    if (validStateKeys.indexOf(stateKey === null ? "noStateKey" : stateKey) === -1) {
      setPriorContentLoaded(true);
      //i'll probably want to add some kind of message saying ther was an error and then try again
      return;
    }

////////////////////////////////////////////////////  HANDLING AUTHENTICATION ERROR  ////////////////////////////////////////////////////  

    if (authorizationError && stateKey === "spotify_auth_first_button") {
      //AUTHENTICATION ERROR FROM FIRST LOG INTO SPOTIFY BUTTON CLICKED
      updateStakeKey('first_button')
      updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: priorToFirstButton, incrementVal: 4})
      setPriorContentLoaded(true);
    } else if (authorizationError && stateKey === "spotify_auth_second_button") {
      //AUTHENTICATION ERROR FROM SECOND LOG INTO SPOTIFY BUTTON CLICKED
      updateStakeKey('second_button')
      updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: priorToSecondButtton, incrementVal: 4})
      setPriorContentLoaded(true);
    } else if (authorizationError && stateKey === "spotify_auth_first_button_second_attempt") {
      //AUTHENTICATION ERROR FROM SECOND ATTEPMT FROM FIRST LOG INTO SPOTIFY BUTTON CLICKED
      updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: priorToFirstButtonSecondAttempt, incrementVal: 7})
      setPriorContentLoaded(true);
    } else if (authorizationError && stateKey === "spotify_auth_second_button_second_attempt") {
      //AUTHENTICATION ERROR FROM SECOND ATTEMPT FROM SECOND LOG INTO SPOTIFY BUTTON CLICKED
      updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: priorToSecondButtonSecondAttempt, incrementVal: 7})
      setPriorContentLoaded(true);

////////////////////////////////////////////////////  AUTH SUCCESSFUL RETRIEVING ACCESS TOKENS  ////////////////////////////////////////////////////  

    } else if (stateKey === "spotify_auth_first_button") {
      //AUTH SUCCESSFULL AFTER FIRST SPOTIFY BUTTON CLICKED
      getAccessTokens({code, priorChatContent: priorToFirstButton, errorVal: 4, successVal: 8});
      setPriorContentLoaded(true);
    } else if (stateKey === "spotify_auth_second_button") {
      //AUTH SUCCESSFULL AFTER SECOND SPOTIFY BUTTON CLICKED
      getAccessTokens({code, priorChatContent: priorToSecondButtton, errorVal: 4, successVal: 8});
      setPriorContentLoaded(true);
    } else if (stateKey === "spotify_auth_first_button_second_attempt") {
      //AUTH SUCCESSFULL AFTER FIRST SPOTIFY BUTTON CLICKED BUT SECOND ATTEMPT WAS MADE
      getAccessTokens({code, priorChatContent: priorToFirstButtonSecondAttempt, errorVal: 7, successVal: 8});
      setPriorContentLoaded(true);
    } else if (stateKey === "spotify_auth_second_button_second_attempt") {
      //AUTH SUCCESSFULL AFTER SECOND SPOTIFY BUTTON CLICKED BUT SECOND ATTEMPT WAS MADE
      getAccessTokens({code, priorChatContent: priorToSecondButtonSecondAttempt, errorVal: 7, successVal: 8});
      setPriorContentLoaded(true);
    }
  };

////////////////////////////////////////////////////  RUN DISPLAYPREVIOUSMESSAGEHISTORY ON COMPONENT MOUNT  ////////////////////////////////////////////////////  

  useEffect(() => {
    displayPreviousMessageHistory()
    //THE BELOW COMMENT IS TO DISREGARD TYPESCRIPT ERROR FOR NOT INCLUDING incrementMessagingPhase AS DEPENDECNY, BECAUSE IF WE DID IT WOULD THROW AND INFINITE CALLBACK LOOP
    // eslint-disable-next-line
  }, [stateKey, authorizationError])

  return (
    <>
      {/* {!priorContentLoaded && <UseAnimations className="Chatty-Loading-Spinner" animation={loading} size={200} style={{ padding: 100 }} strokeColor="#37f8ff" />} */}
      {priorContentLoaded && <ChattyDisplay priorContentLoaded={priorContentLoaded}/>}
    </>
  );
};

export default Chatty;