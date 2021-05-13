import React from 'react';

interface Props {
    buttonText: string
}

//RENDER THE JSX OF A BUTTON THAT HAS BEEN SELECTED BY THE USER (OPAQUE INSTEAD OF TRANSLUCENT)
function ButtonsPast({buttonText}: Props) {

  return (
    <div className='Chatty-Button-Main'>
      <div className='Chatty-Button-Box-Clicked'><p className='Chatty-Button'><p>{buttonText}</p></p></div>
    </div>
  );
};

export default ButtonsPast;