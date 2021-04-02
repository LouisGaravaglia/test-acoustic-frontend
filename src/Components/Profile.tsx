import React, {useContext} from "react";
import {MessagesContext} from "./ChatBot/MessagesProvider";

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

  return (
    <div className="Profile-Container">
      <p className="Profile-Placeholder">.</p>
      <div className="Profile-Box">
        <p className="Profile-Header">Welcome to your profile, {user.first_name}!</p>
        {/* <ul className="Profile-List">
          {Object.keys(user).map((value, index) => <p key={index} className="Profile-Header">{value + ": " + user[value as keyof IUser]}</p>)}
        </ul> */}
      </div>
    </div>
  );
};

export default Profile;