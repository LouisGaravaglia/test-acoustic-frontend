import React, {useEffect, useRef} from 'react';

interface Props {
  buttons: Array<JSX.Element>
};

function ButtonWrapper({buttons}: Props): JSX.Element {
  const scrollToBottomRef = useRef<any | null>();

  //SCROLL DOWN TO END OF MESSAGE TYPING TO KEEP MESSAGES IN VIEWPORT WHILE CHATTY IS TYPING
  useEffect(() => {
    const scrollToBottom = () => {
      scrollToBottomRef.current.scrollIntoView({behavior: 'smooth'});
    };
    scrollToBottom();
  }, []);

  return (
    <div className='Chatty-Button-Container' ref={scrollToBottomRef}>
      {buttons && buttons.map((item, index) => <div key={index} className='Chatty-Button-Main'>{item}</div>)}
    </div>
  );
};

export default ButtonWrapper;