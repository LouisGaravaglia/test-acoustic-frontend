import React, {useContext, useRef} from 'react';
import {MessagesContext} from './MessagesProvider';
import useViewport from '../../Hooks/useViewport';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading'
import useChattyScript from './helpers/useChattyScript';

//RENDER THE ARRAY OF JSX ELEMENTS THAT IS THE DISPLAYEDCONTENT, AND DISPLAY THE NEXT ITEM TO DISPLAY FROM CHATTYSCRIPT
function ChattyDisplay(): JSX.Element {
  const scrollToBottomRef = useRef<any | null>();
  const {chattyMessagesPhase, displayedContent, loadingSpinner} = useContext(MessagesContext);
  const {viewportHeight}  = useViewport();;
  const {chattyScript} = useChattyScript();

  return (
    <>
    {loadingSpinner && <UseAnimations className='Chatty-Loading-Spinner' animation={loading} size={200} style={{ padding: 100 }} strokeColor='#181718' />}
    <div className='Chatty-Container' >
      <div className='Chatty' style={{maxHeight: viewportHeight - 200}}>
        <div className='Chatty-Left-Filler'></div>
        <div className='Chatty-Display'>
          {displayedContent.map((item, index) => <div key={index}>{item}</div>)}
          {chattyScript[chattyMessagesPhase]}
          <div className='Chatty-MSG-Bottom-Filler' ref={scrollToBottomRef}></div>
        </div>
        <div className='Chatty-Right-Filler'></div>
      </div>
    </div>
    </>
  );
};

export default ChattyDisplay;