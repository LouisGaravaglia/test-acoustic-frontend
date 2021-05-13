import React, {useContext} from 'react';
import {MessagesContext} from './ChatBot/MessagesProvider';

// interface IUser {
//   first_name: string
//   last_name: string
//   email: string
//   username: string
//   password: string
//   access_token: string,
//   refresh_token: string
// }

function Profile(): JSX.Element {
  const {user} = useContext(MessagesContext);
  let welcomeMessage;

  if (user.first_name === '') {
    welcomeMessage = <p className='Profile-Header'>Welcome to your profile!</p>
  } else {
    welcomeMessage = <p className='Profile-Header'>Welcome to your profile, {user.first_name}!</p>
  }

  return (

    //     {/* <ul className='Profile-List'>
    //       {Object.keys(user).map((value, index) => <p key={index} className='Profile-Header'>{value + ': ' + user[value as keyof IUser]}</p>)}
    //     </ul> */}

    <>
      <div className='Home-Upper-Box'>
        {welcomeMessage}
      </div>
    </>
  );
};

export default Profile;