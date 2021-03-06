import React, {useState, useRef, useEffect, useContext, useMemo} from 'react';
import useInterval from '../../../Hooks/useInterval';
import {MessagesContext} from '../MessagesProvider';
import MessagesWrapper from './MessagesWrapper';
import MesssagesTypingCursor from './MessagesTypingCursor';
import MessagesCurrent from './MessagesCurrent';
import MessagesPast from './MessagesPast';

//DEFINING THE CONTRACT FOR THE VARIABLE TYPES THAT WILL BE PASSED IN VIA PROPS
interface Props {
  messages: Array<string>
  finishedFunction?: (val: boolean) => void
  addToDisplayedContent?: boolean
  incrementMessageValue?: number
};

//OUR COMPONENT THAT ACCEPTS THE APPROPRIATE MESSAGES NEEDED FOR OUR CHATTY RESPONSE AND
//APPENDS THEM TO THE DOM ONE LETTER AT A TIME
function MessagesContainer({messages, finishedFunction, addToDisplayedContent = true, incrementMessageValue = 1}: Props): JSX.Element {
  const [displayedMessages, setDisplayedMessages] = useState<Array<string>>([]);
  const [createMessage, setCreateMessage] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  let messageCharLength = useRef(0)
  let charLength = useRef(0);
  // let delayValue = useRef(100);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [finishedMessages, setFinishedMessages] = useState<boolean>(false);
  const [onLastMessage, setOnLastMessage] = useState<boolean>(false);
  const {incrementMessagingPhase, addContentToBeDisplayed} = useContext(MessagesContext);
  const useIntervalId = useRef<any | null>();
  const scrollToBottomRef = useRef<any | null>();
  const timeoutId = useRef<any | null>();
  const typingCursor: string = ' \u{258C}';

  //SCROLL DOWN TO END OF MESSAGE TYPING TO KEEP MESSAGES IN VIEWPORT WHILE CHATTY IS TYPING
  useEffect(() => {
    function scrollingToBottom() {
      scrollToBottomRef.current.scrollIntoView({behavior: 'smooth'});
    };
    if (count < messages.length && !finishedMessages) scrollingToBottom();
  }, [count, finishedMessages, messages]);

  //FUNCTION TO PASS TO OUR USEINTERVAL HOOK TO APPEND A LETTER AT A TIME TO CREATEMESSAGE
  //IN ORDER TO CREATE THE LOOK AS IF OUR CHAT BOT WAS TYPING
  function appendMessages() {
    messageCharLength.current = messages[count].length;
    const msgWithNewLetterAdded: string = messages[count].substring(charLength.current, charLength.current + 1);
    const msgWithRemovedCursor = createMessage.slice(0, -2);
    setCreateMessage(msgWithRemovedCursor + msgWithNewLetterAdded + typingCursor);
    charLength.current = charLength.current + 1;
    //CHANGING THE DELAY VALUE AFTER EACH LETTER APPENDED TO SCREEN IN ORDER TO TRY
    //AND CREATE A MORE HUMAN VARIABLE TYPING SPEED
    //THERE IS A BUG IN SAFARI USING THIS METHOD, SO NOT CREATING A DYNAMIC TYPING SPEED AT THE MOMENT
    // delayValue.current = Math.floor(Math.random() * 60) + 1;
  };

  // CALLING THE USEINTERVAL HOOK TO BE ABLE TO DYNAMICALLY ALTER THE DELAY FOR OUR INTERVAL
  useInterval(appendMessages, isRunning ? 40 : null, useIntervalId);

  //SET TIMEOUT TO UPDATE ISRUNNING VARAIBLE TO TRUE AFTER A BRIEF PAUSE TO SPACE OUT CHATTY'S MESSAGES
  useEffect(() => {
    if (isRunning) return;
    //IF ALL MESSAGES HAVE BEEN APPENDED TO OUR DOM DON'T NEED TO UPDATE COUNT OR CHANGE ISRUNNING
    if (count >= messages.length && count !== 0) return;

    timeoutId.current = setTimeout(() => {
      setIsRunning(true);
      //MOVED SETCOUNT TO BE INSIDE THIS TIMEOUT AS A WAY TO PREVENT AN INFINITE LOOP
      //SINCE THIS EXECUTES RIGHT BEFORE COUNT IS SET BACK TO ZERO WHICH NEVER TRIGGERS
      //THE CLEAR INTERVAL USE EFFECT
      setCount(num => num + 1);
    }, 500);

    return () => clearTimeout(timeoutId.current);
  },[isRunning, count, messages]);

  //USEEFFECT THAT WILL RESET CREATEMESSAGE TO AN EMPTY STRING ONCE THE MESSAGE IS FINISHED
  //AND THEN APPEND THAT MESSAGE TO DISPLAYEDMESSAGES TO APPEND TO THE DOM 
  useEffect(() => {
    if (charLength.current >= messageCharLength.current && messageCharLength.current !== 0) {
      const msgWithRemovedCursor = createMessage.slice(0, -2);
      setDisplayedMessages(state => [...state, msgWithRemovedCursor]);
      setCreateMessage('');
      charLength.current = 0;
      setIsRunning(false);
    };
  }, [setCount, charLength, messageCharLength, setDisplayedMessages, setCreateMessage, createMessage]);

  //USEEFFECT THAT WILL CLEAR THE USEINTERVAL TIMER WHEN ALL MESSAGES PASSED IN TO OUR 
  //MESSAGE WRAPPER COMPONENT HAVE FINISHED APPENDING TO THE DOM
  useEffect(() => {
    if (count >= messages.length && count !== 0) {
      clearInterval(useIntervalId.current);
      setCount(0);
      charLength.current = 0;
      setFinishedMessages(true);
      if (finishedFunction) finishedFunction(true);
      if (addToDisplayedContent) {
        addContentToBeDisplayed([<MessagesPast messages={messages}/>])
        incrementMessagingPhase(incrementMessageValue);
      }
    };
  }, [count, messages, finishedFunction, incrementMessagingPhase, addContentToBeDisplayed, incrementMessageValue, addToDisplayedContent]);

  //UPDATING ONLASTMESSAGE TO BE TRUE TO PREVENT TYPING CURSOR TO APPEAR AFTER THE LAST MESSAGE
  useEffect(() => {
    const preventTypingCursor = () => {
      setOnLastMessage(true);
    };
    if (count === messages.length - 1) preventTypingCursor();
  }, [count, setOnLastMessage, messages]);

  const memoizedDisplayedMessages = useMemo(() => <MessagesPast messages={displayedMessages}/>, [displayedMessages])


  // RETURNING JSX
  return (
    <MessagesWrapper>
      {displayedMessages && memoizedDisplayedMessages}
      <MessagesCurrent createMessage={createMessage}/>
      <MesssagesTypingCursor onLastMessage={onLastMessage} scrollToBottomRef={scrollToBottomRef} isRunning={isRunning} typingCursor={typingCursor}/>
    </MessagesWrapper>
  );
};

export default MessagesContainer;