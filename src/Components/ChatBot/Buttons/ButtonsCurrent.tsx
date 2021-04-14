import React, {useEffect, useRef} from 'react';

interface Props {
  buttons: Array<JSX.Element>
  scrollToBottomRef: any | null
};

function ButtonsCurrent({buttons, scrollToBottomRef}: Props): JSX.Element {

  return (
    <div className='Chatty-Button-Container' ref={scrollToBottomRef}>
      {buttons && buttons.map((item, index) => <div key={index} className='Chatty-Button-Main'>{item}</div>)}
    </div>
  );
};

export default ButtonsCurrent;