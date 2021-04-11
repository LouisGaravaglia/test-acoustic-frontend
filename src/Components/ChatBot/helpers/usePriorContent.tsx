import React from 'react';
import useMessages from './useMessages';
import DisplayedButton from '../DisplayedButton';
import DisplayedMessage from '../DisplayedMessage';

//RENDERING DISPLAYED MESSAGES AND SELECTED BUTTONS PRIOR TO USER ATTEMPTING TO AUTHORIZE VIA SPOTIFY
function DisplayedSets() {
  const {initialMessages, whatIfNoSpotify, spotifyAccountError} = useMessages();

  const priorToFirstButton = [
    <DisplayedMessage key={initialMessages.id} messages={initialMessages.messages} />,
    <DisplayedButton key={'b1'} buttonText={'Log into my Spotify'}/>
  ];

  const priorToSecondButtton = [
    <DisplayedMessage key={initialMessages.id} messages={initialMessages.messages} />,
    <DisplayedButton key={'b1'} buttonText={`What if I don't have Spotify?`}/>,
    <DisplayedMessage key={whatIfNoSpotify.id} messages={whatIfNoSpotify.messages} />,
    <DisplayedButton key={'b2'} buttonText={'Log into Spotify'}/>,
  ];

  const priorToFirstButtonSecondAttempt = [
    <DisplayedMessage key={initialMessages.id} messages={initialMessages.messages} />,
    <DisplayedButton key={'b1'} buttonText={'Log into Spotify'}/>,
    <DisplayedMessage key={spotifyAccountError.id} messages={spotifyAccountError.messages} />,
    <DisplayedButton key={'b2'} buttonText={'Try again'}/>,
  ];

  const priorToSecondButtonSecondAttempt = [
    <DisplayedMessage key={initialMessages.id} messages={initialMessages.messages} />,
    <DisplayedButton key={'b1'} buttonText={`What if I don't have Spotify?`}/>,
    <DisplayedMessage key={whatIfNoSpotify.id} messages={whatIfNoSpotify.messages} />,
    <DisplayedButton key={'b2'} buttonText={'Log into Spotify'}/>,
    <DisplayedMessage key={spotifyAccountError.id} messages={spotifyAccountError.messages} />,
    <DisplayedButton key={'b3'} buttonText={'Try again'}/>,
  ];

  return {
    priorToFirstButton,
    priorToSecondButtton,
    priorToFirstButtonSecondAttempt,
    priorToSecondButtonSecondAttempt
  }
};

export default DisplayedSets;