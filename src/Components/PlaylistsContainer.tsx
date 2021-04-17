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



    <div className='Playlists-Container'>

      <div className="Playlists-Header-Box">
        <h1 className="Playlists-Selected-Title">{fakePlaylist.name}</h1>
      </div>

      <div className="Playlists-Selected-Content">
        <div className='Playlists-Left-Box'>
        </div>

        <div className='Playlists-Right-Box'>
            {tracks.map((value: any, index: any) => 
              <div key={value.track.id}>
                <p className='Playlists-Track-Name'>{value.track.name}</p>
                <p className='Playlists-Artist-Name'>{value.track.artists[0].name}</p>
            </div>
            )}
        </div>
      </div>
      
  

  
    </div>
  );
};

export default PlaylistsContainer;