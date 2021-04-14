import React from 'react';

function MessagesWrapper(props: any): JSX.Element {

  return (
    <div className='Chatty-Message-Container'>
      {props.children}
    </div>
  );
};

export default MessagesWrapper;