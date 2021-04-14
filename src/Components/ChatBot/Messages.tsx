import React, {useState, useRef, useEffect, useContext, useMemo} from 'react';
import useInterval from '../../Hooks/useInterval';
import {MessagesContext} from './MessagesProvider';
import DisplayedMessage from './DisplayedMessage';

import DisplayedMessagesTest from './DisplayedMessagesTest';

//DEFINING THE CONTRACT FOR THE VARIABLE TYPES THAT WILL BE PASSED IN VIA PROPS
interface Props {
  displayedMessages: string[]
  createMessage: string
  typingCursorJSX: JSX.Element
};

function Messages({displayedMessages, createMessage, typingCursorJSX}: Props): JSX.Element {

  //NEEDED TO SEPARATE OUT ONLASTMESSAGE FROM THE INLINE CONDITIONAL IN JSX SINCE THERE SCROLLINTOVIEW WOULD
  //SOMETIMES CAUSE AN ERROR SINCE JSX WOULDNT BE IN VIEW FOR AT TIMES
  if (onLastMessage) {
    typingCursorJSX = <div ref={scrollToBottomRef}></div>;
  } else {
    typingCursorJSX = (
      <>
      {!isRunning && <div className='Chatty-Message-Box' ref={scrollToBottomRef}><p className='Chatty-Message'>{typingCursor}</p></div>}
      {isRunning && <div className='Chatty-Message-Box' ref={scrollToBottomRef}><p className='Chatty-Message-Black'>‎‎_</p></div>}
      </>
    )
  };


  const memoizedDisplayedMessages = useMemo(() => <DisplayedMessagesTest messages={displayedMessages}/>, [displayedMessages])

  return (
    <div className='Chatty-Message-Container'>
      {displayedMessages && memoizedDisplayedMessages}
      {createMessage && <div className='Chatty-Message-Box'><p className='Chatty-Message'>{createMessage}</p></div>}
      {typingCursorJSX}
    </div>
  );
};

export default Messages;