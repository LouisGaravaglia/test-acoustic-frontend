import React from 'react';

interface Props {
    buttonText: string
}

//RENDER THE JSX OF A BUTTON THAT HAS BEEN SELECTED BY THE USER (OPAQUE INSTEAD OF TRANSLUCENT)
function DisplayedButton({buttonText}: Props) {

  return (
    <div className='Chatty-Button-Container'>
      <div className='Chatty-Button-Box'><button className='Chatty-Button Chatty-Button-Clicked'><p>{buttonText}</p></button></div>
    </div>
  );
};

export default DisplayedButton;