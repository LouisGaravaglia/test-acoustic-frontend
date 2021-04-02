import React, {useContext} from "react";
import {MessagesContext} from "../MessagesProvider";
import Backend from "../../../Backend";

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
  const {updateUser, incrementMessagingPhase, addContentToBeDisplayed} = useContext(MessagesContext);

  function updateChattyToDisplayWhereUserLastLeftOff(updateChattyObj: updateChattyProperties) {
    addContentToBeDisplayed(updateChattyObj.priorChatContent)
    incrementMessagingPhase(updateChattyObj.incrementVal)
  }

  async function getAccessTokens(makeRequestObj: AccessTokenRequestProperties) {
      const tokenObj: TokenObj = await Backend.requestAccessTokens(makeRequestObj.code)
      //THERE IS GOING TO BE A REDIRECT TO CHATTY AFTER MAKING A REQUEST SO WE'LL NEED TO DISPLAY THE CHAT CONTENT THE USER HAS ALREADY SEEN, OTHERWISE WE'D HAVE TO START THE CHAT OVER
      if (tokenObj.error) {
        //HANDLING ACCESS TOKEN REQUEST ERROR
        updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: makeRequestObj.priorChatContent, incrementVal: makeRequestObj.errorVal})
      } else {
        //HANDLING ACCESS TOKEN REQUEST SUCCESS
        updateChattyToDisplayWhereUserLastLeftOff({priorChatContent: makeRequestObj.priorChatContent, incrementVal: makeRequestObj.successVal})
        updateUser("access_token", tokenObj.access_token)
        updateUser("refresh_token", tokenObj.refresh_token)
      }
  }

  return {
    getAccessTokens,
    updateChattyToDisplayWhereUserLastLeftOff
  }
};

export default useSpotifyAuth;