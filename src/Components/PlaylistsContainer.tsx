import React, {useContext} from 'react';
import {MessagesContext} from './ChatBot/MessagesProvider';
let playlists =  require('../fakeData/playlist.json');

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
  console.log("playlists: ", playlists);
  let tracks = playlists[0].tracks.items;
  console.log("tracks: ", tracks);
  console.log("2nd playlist name: ", playlists[1].name );
  

  
  

  return (



    <div className='Playlists-Container'>

      <div className="Playlists-Header-Box">
        <h1 className="Playlists-Selected-Title">{playlists[0].name.toUpperCase()}</h1>
      </div>

      <div className="Playlists-Selected-Content">

        <div className='Playlists-Artwork-Box'>
        </div>

        <div className='Playlists-Tracks-Container'>
            {tracks.map((value: any, index: any) => 
              <div key={value.track.id} className='Playlists-Tracks-Box'>
                {/* <div className="Playlists-Track"> */}
                  <p className='Playlists-Track-Name'>{value.track.name}</p>
                {/* </div> */}
                {/* <div className="Playlists-Artist"> */}
                  <p className='Playlists-Artist-Name'>{value.track.artists[0].name.toUpperCase()}</p>
                {/* </div> */}
            </div>
            )}
        </div>
      </div>
      
      <div className='Playlists-All-Container'>
            {playlists.map((playlist: any, index: any) => 
              <div key={playlist.id} className='Playlists-All-Box'>
                <p className='Playlists-Name'>{playlist.name.toUpperCase()}</p>
              </div>
            )}

              <div className='Playlists-Placeholder-Box'>
              </div>

              <div className='Playlists-Placeholder-Box'>
              </div>

              <div className='Playlists-Placeholder-Box'>
              </div>
              <div className='Playlists-Placeholder-Box'>
              </div>
        </div>
 

  
    </div>
  );
};

export default PlaylistsContainer;