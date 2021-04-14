import React from 'react';
import Messages from './MessagesWrapper';

interface Props {
    messages: string[]
    // activelyTypingAdditionalMessages?: boolean
}

//RENDER THE JSX OF A MESSAGE THAT HAS ALREADY BEEN SHOWN TO THE USER
function MessagesPast({messages}: Props) {

  // if (activelyTypingAdditionalMessages) return <>{messages.map((item, index) => <div key={index} className='Chatty-Message-Box'><p className='Chatty-Message'>{item}</p></div>)}</>

  return (
    <Messages>
      {messages.map((item, index) => <div key={index} className='Chatty-Message-Box'><p className='Chatty-Message'>{item}</p></div>)}
    </Messages>
  );
};

export default MessagesPast;