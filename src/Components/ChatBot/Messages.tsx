import React from 'react';

function Messages(props: any): JSX.Element {

  return (
    <div className='Chatty-Message-Container'>
      {props.children}
    </div>
  );
};

export default Messages;