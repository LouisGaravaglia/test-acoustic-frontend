import React from 'react';

interface Props {
  onLastMessage: boolean
  scrollToBottomRef: any | null
  isRunning: boolean
  typingCursor: string
};

//NEEDED TO SEPARATE OUT ONLASTMESSAGE FROM THE INLINE CONDITIONAL IN JSX SINCE THERE SCROLLINTOVIEW WOULD
//SOMETIMES CAUSE AN ERROR SINCE JSX WOULDNT BE IN VIEW FOR AT TIMES
function TypingCursor({onLastMessage, scrollToBottomRef, isRunning, typingCursor}: Props): JSX.Element {

  if (onLastMessage) return <div ref={scrollToBottomRef}></div>;

  return (
      <>
      {!isRunning && <div className='Chatty-Message-Box' ref={scrollToBottomRef}><p className='Chatty-Message'>{typingCursor}</p></div>}
      {isRunning && <div className='Chatty-Message-Box' ref={scrollToBottomRef}><p className='Chatty-Message-Black'>‎‎_</p></div>}
      </>
    )

};

export default TypingCursor;