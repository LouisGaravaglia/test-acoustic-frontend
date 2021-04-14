import React from 'react';
import useMessages from './useMessages';
import ButtonsPast from '../Buttons/ButtonsPast';
import MessagesPast from '../Messages/MessagesPast';

//RENDERING DISPLAYED MESSAGES AND SELECTED BUTTONS PRIOR TO USER ATTEMPTING TO AUTHORIZE VIA SPOTIFY
function DisplayedSets() {
  const {initialMessages, whatIfNoSpotify, spotifyAccountError} = useMessages();

  const priorToFirstButton = [
    <MessagesPast key={initialMessages.id} messages={initialMessages.messages} />,
    <ButtonsPast key={'b1'} buttonText={'Log into my Spotify'}/>
  ];

  const priorToSecondButtton = [
    <MessagesPast key={initialMessages.id} messages={initialMessages.messages} />,
    <ButtonsPast key={'b1'} buttonText={`What if I don't have Spotify?`}/>,
    <MessagesPast key={whatIfNoSpotify.id} messages={whatIfNoSpotify.messages} />,
    <ButtonsPast key={'b2'} buttonText={'Log into Spotify'}/>,
  ];

  const priorToFirstButtonSecondAttempt = [
    <MessagesPast key={initialMessages.id} messages={initialMessages.messages} />,
    <ButtonsPast key={'b1'} buttonText={'Log into Spotify'}/>,
    <MessagesPast key={spotifyAccountError.id} messages={spotifyAccountError.messages} />,
    <ButtonsPast key={'b2'} buttonText={'Try again'}/>,
  ];

  const priorToSecondButtonSecondAttempt = [
    <MessagesPast key={initialMessages.id} messages={initialMessages.messages} />,
    <ButtonsPast key={'b1'} buttonText={`What if I don't have Spotify?`}/>,
    <MessagesPast key={whatIfNoSpotify.id} messages={whatIfNoSpotify.messages} />,
    <ButtonsPast key={'b2'} buttonText={'Log into Spotify'}/>,
    <MessagesPast key={spotifyAccountError.id} messages={spotifyAccountError.messages} />,
    <ButtonsPast key={'b3'} buttonText={'Try again'}/>,
  ];

  return {
    priorToFirstButton,
    priorToSecondButtton,
    priorToFirstButtonSecondAttempt,
    priorToSecondButtonSecondAttempt
  }
};

export default DisplayedSets;