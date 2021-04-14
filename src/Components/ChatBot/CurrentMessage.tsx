import React, {useState, useRef, useEffect, useContext, useMemo} from 'react';
import useInterval from '../../Hooks/useInterval';
import {MessagesContext} from './MessagesProvider';
import DisplayedMessage from './DisplayedMessage';

import DisplayedMessagesTest from './PastMessages';

//DEFINING THE CONTRACT FOR THE VARIABLE TYPES THAT WILL BE PASSED IN VIA PROPS
interface Props {
  createMessage: string
};

function CurrentMessage({createMessage}: Props): JSX.Element {

  return (
    <>
      {createMessage && <div className='Chatty-Message-Box'><p className='Chatty-Message'>{createMessage}</p></div>}
    </>
  );
};

export default CurrentMessage;