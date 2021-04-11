import React, {useContext} from 'react';
import {MessagesContext} from '../MessagesProvider';

interface IMessageObj {
  id: string
  messages: string[]
}

// type Hook = () => {
//   initialMessages: IMessageObj,
//   whatIfNoSpotify: IMessageObj,
//   proceedWithoutSpotify: IMessageObj,
//   registerUserPartOne: IMessageObj,
//   registerUserPartTwo: IMessageObj,
//   registerUserPartThree: IMessageObj,
//   registerUserPartFour: IMessageObj,
//   registerUserPartFive: IMessageObj,
//   registerUserPartSix: IMessageObj,
//   spotifyAccountValid: IMessageObj,
//   secondFailedAttempt: IMessageObj,
//   spotifyAccountError: IMessageObj
// };

function useMessages() {
  const {user} = useContext(MessagesContext);
  let userFirstName = user['first_name'] !== '' ? user['first_name'] : 'there';
  const userUsername = user['username'] !== '' ? user['username'] : '';

////////////////////////////////////////////////////  PRE BAKED MESSAGES FOR CHATTY  ////////////////////////////////////////////////////

  const initialMessages: IMessageObj = {
    id: 'm1',
    messages: [
      `Hi, I'm Acoustic.io, your digital companion. I'm here to share new music with you.`, 
      `If you're already a registered user you can login by clicking the link above.`,
      `If you're new I'll walk you through setting up your Spotify Account.`,
      `This will allow me to scan it for trends in your listening history to better assist me in suggesting the most relevant music for you.`
    ]
  };

  //CREATING SHORTER MESSAGES FOR QUICKER TESTING
  // const initialMessages: IMessageObj = {
  //   id: 'm1',
  //   messages: ['hi']
  // };

  const whatIfNoSpotify: IMessageObj = {
    id: 'm2',
    messages: [
      'Being able to access your Spotify will help me create playlists that have a higher chance of being ones that you will enjoy.',
      `Also, you'll be able to save playlists directly to your Spotify account without leaving our site.`,
      `But don't worry if you don't have a Spotify account.`,
      'I can still set up a profile for you and share playlists.',
      `And I promise I won't share your information with anyone or alter your Spotify data other than saving playlists to your account.`
    ]
  };

  const spotifyAccountError: IMessageObj = {
    id: 'm3',
    messages: [
      'Oh no there was an error setting up your Spotify account!',
      'Are you sure you entered the right info?',
      'Or maybe you clicked cancel.',
      'Do you want to try again or proceed without connecting your Spotify?'
    ]
  };

  const proceedWithoutSpotify: IMessageObj = {
    id: 'm4',
    messages: [
      `Sounds good, we won't connect a Spotify account`,
      'We can always add it later in your profile settings.'
    ]
  };

  const secondFailedAttempt: IMessageObj = {
    id: 'm5',
    messages: [
      `Dangit, it didn't work this time either.`,
      `I'm just going to proceed without using Spotify.`,
      'We can always add it later in your profile settings.'
    ]
  };

  const spotifyAccountValid: IMessageObj = {
    id: 'm6',
    messages: [`Perfect, you're Spotify account is all set up!`]
  };

  //CREATING SHORTER MESSAGES FOR QUICKER TESTING
  // const registerUserPartOne: IMessageObj = {
  //   id: 'm7',
  //   messages: [
  //     `Let's start with your first name.`
  //   ]
  // };

  const registerUserPartOne: IMessageObj = {
    id: 'm7',
    messages: [
      `Ok, now we'll set up a profile for you.`, 
      'This will give us a place to continually add you new music as it comes out.',
      `Let's start with your first name. You can use the input field below to enter it.`
    ]
  };

  const registerUserPartTwo: IMessageObj = {
    id: 'm8',
    messages: [
      `Hi ${userFirstName}!`,
      `And what's your last name?`
    ]
  };

  const registerUserPartThree: IMessageObj = {
    id: 'm9',
    messages: [
      `Excellent. And what's your email address in case you get locked out.`,
      `We promise we won't spam you with emails.`
    ]
  };

  const registerUserPartFour: IMessageObj = {
    id: 'm10',
    messages: ['What would you like your username to be?']
  };

  const registerUserPartFive: IMessageObj = {
    id: 'm11',
    messages: [
      `Ok ${userUsername} it is!`,
      'And lastly, what would you like your password to be?'
    ]
  };

  const registerUserPartSix: IMessageObj = {
    id: 'm12',
    messages: [
      `Perfect, you're all set up!`,
      `I'm taking you to your profile now.`
    ]
  };

  return {
    initialMessages,
    whatIfNoSpotify,
    proceedWithoutSpotify,
    registerUserPartOne,
    registerUserPartTwo,
    registerUserPartThree,
    registerUserPartFour,
    registerUserPartFive,
    registerUserPartSix,
    spotifyAccountError,
    spotifyAccountValid,
    secondFailedAttempt
  };
};

export default useMessages;