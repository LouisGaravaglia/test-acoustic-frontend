import React, {useEffect, useRef} from 'react';
import ButtonsCurrent from './ButtonsCurrent'

interface Props {
  buttons: Array<JSX.Element>
};

function ButtonsContainer({buttons}: Props): JSX.Element {
  const scrollToBottomRef = useRef<any | null>();

  //SCROLL DOWN TO END OF MESSAGE TYPING TO KEEP MESSAGES IN VIEWPORT WHILE CHATTY IS TYPING
  useEffect(() => {
    const scrollToBottom = () => {
      scrollToBottomRef.current.scrollIntoView({behavior: 'smooth'});
    };
    scrollToBottom();
  }, []);

  return <ButtonsCurrent buttons={buttons} scrollToBottomRef={scrollToBottomRef}/>;
};

export default ButtonsContainer;