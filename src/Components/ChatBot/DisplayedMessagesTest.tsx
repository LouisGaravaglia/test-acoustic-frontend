import React from 'react';

interface Props {
    messages: string[]
}

//RENDER THE JSX OF A MESSAGE THAT HAS ALREADY BEEN SHOWN TO THE USER
function DisplayedMessagesTest({messages}: Props) {

  return (
    <>
      {messages.map((item, index) => <div key={index} className='Chatty-Message-Box'><p className='Chatty-Message'>{item}</p></div>)}
    </>
  );
};

export default DisplayedMessagesTest;