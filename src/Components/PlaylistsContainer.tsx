import React, {useContext} from 'react';
import {MessagesContext} from './ChatBot/MessagesProvider';
import useMousePosition from '../Hooks/useMousePosition';
import PlaylistsThumbnail from './PlaylistsThumbnail';
import PlaylistsTrack from './PlaylistsTrack';
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
  // console.log("playlists: ", playlists);
  let tracks = playlists[0].tracks.items;
  const {x, y} = useMousePosition();
  // console.log("tracks: ", tracks);
  // console.log("2nd playlist name: ", playlists[1].name );
  // console.log("mousePosition - x: ", x);
  // console.log("mousePosition - y: ", y);
  
  

  
  

  return (



    <div className='Playlists-Container'>

      <div className="Playlists-Header-Box">
        <h1 className="Playlists-Selected-Title">{playlists[0].name}</h1>
      </div>

      <div className="Playlists-Selected-Content">

        <div className='Playlists-Artwork-Box'>
          <img className='Playlists-Artwork' src={playlists[0].images[0].url} alt=""/>
        </div>

        <div className='Playlists-Tracks-Container'>
            {tracks.map((track: any, index: number) => 
              <PlaylistsTrack track={track} index={index}/>
            )}
        </div>
      </div>
      
      <div className='Playlists-All-Container'>
            {playlists.map((playlist: any, index: any) => 
              <PlaylistsThumbnail playlist={playlist}/>
              // <div key={playlist.id} className='Playlists-All-Box'>
              //   <p className='Playlists-Name'>{playlist.name.toUpperCase()}</p>
              // </div>
            )}

              {/* <div className='Playlists-Placeholder-Box'></div>
              <div className='Playlists-Placeholder-Box'></div>
              <div className='Playlists-Placeholder-Box'></div>
              <div className='Playlists-Placeholder-Box'></div> */}

        </div>
 

  
    </div>
  );
};

export default PlaylistsContainer;