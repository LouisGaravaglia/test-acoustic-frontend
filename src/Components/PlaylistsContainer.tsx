import React, {useContext} from 'react';
import {MessagesContext} from './ChatBot/MessagesProvider';
let fakePlaylist =  require('../fakeData/playlist.json');

// interface IUser {
//   first_name: string
//   last_name: string
//   email: string
//   username: string
//   password: string
//   access_token: string,
//   refresh_token: string
// }

function PlaylistsContainer(): JSX.Element {
  console.log("fakePlaylist: ", fakePlaylist);
  let tracks = fakePlaylist.tracks.items;
  console.log("tracks: ", tracks);
  
  

  return (



    <>
      <div className='Home-Upper-Box'>
         <ul className='PlaylistsContainer-List'>
           {tracks.map((value: any, index: any) => 
            <div key={value.track.id}>
              <p className='Profile-Header'>{value.track.name}</p>
              <p className='Profile-Header'>{value.track.artists[0].name}</p>
           </div>
           
           )}
          {/* {Object.keys(user).map((value, index) => <p key={index} className='PlaylistsContainer-Header'>{value + ': ' + user[value as keyof IUser]}</p>)} */}
        </ul>
      </div>
    </>
  );
};

export default PlaylistsContainer;