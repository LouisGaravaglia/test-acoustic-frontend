import React, {useContext, useState} from 'react';
import { IoArrowDown } from 'react-icons/io5';
import {MessagesContext} from './ChatBot/MessagesProvider';
// import useMousePosition from '../Hooks/useMousePosition';
import PlaylistsThumbnail from './PlaylistsThumbnail';
import PlaylistsTrack from './PlaylistsTrack';
import PlaylistsTitleScrollContainer from './PlaylistsTitleScrollContainer';
import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from 'react-icons/fi';
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
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  // console.log("playlists: ", playlists);
  let tracks = playlists[0].tracks.items;
  // const {x, y} = useMousePosition();
  // console.log("tracks: ", tracks);
  // console.log("2nd playlist name: ", playlists[1].name );
  // console.log("mousePosition - x: ", x);
  // console.log("mousePosition - y: ", y);
  
  let playOrPauseIcon;



  return (



    <div className='Playlists-Container'>

      <div className='Playlists-Selected-Header-Box'>
        <PlaylistsTitleScrollContainer />
        {/* <div className='Playlists-Selected-Header-Filler'></div>
        <h1 className='Playlists-Selected-Title'>{playlists[0].name}</h1> */}
      </div>
        {/* <div className='Playlists-Selected-Header-Box'>
          <h1 className='Playlists-Artwork-Title'>{playlists[0].name}</h1>
        </div> */}
      <div className='Playlists-Selected-Content'>



        <div className='Playlists-Artwork-Box'>

          {/* <div className='Playlists-Artwork-Square'></div> */}
          {/* <div className='Playlists-Artwork-Overlay'></div> */}
          <img className='Playlists-Artwork' src={playlists[0].images[0].url} alt=''/>

        </div>

        <div className='Playlists-Tracks-Container'>
            {tracks.map((track: any, index: number) => 
              <PlaylistsTrack track={track} key={index} index={index} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack}/>
            )}
        </div>

        <div className='Playlists-Controls-Container'>

          <div className='Playlists-Controls-Box'>
            <div className="Playlists-Controls-Box-Left-Filler"></div>

            {/* <div className='Playlists-Prev-Container'>
              <div className='Playlists-Prev-Box'>
                <div className='Playlists-Prev-Overlay'></div>
                <h1 className='Playlists-Prev'>Prev <FiSkipBack className='Playlists-Prev-Icon'/></h1>
              </div>
            </div>

            <div className='Playlists-Play-Container'>
              <div className='Playlists-Play-Box'>
                <div className='Playlists-Play-Overlay'></div>
                <h1 className='Playlists-Play'>Play <FiPlay className='Playlists-Play-Icon'/></h1>
              </div>
            </div>

            <div className='Playlists-Next-Container'>
              <div className='Playlists-Next-Box'>
                <div className='Playlists-Next-Overlay'></div>
                <h1 className='Playlists-Next'>Next <FiSkipForward className='Playlists-Next-Icon'/></h1>
              </div>
            </div> */}

        
          </div>
          <div className='Playlists-Controls-Right-Filler'></div>
        </div>

      </div>
      {/* <div className='Test-Container'> */}
      <div className='Playlists-All-Container'>
        <div className='Playlists-All-Headers'>

          <div className='Playlists-All-Title-Box'>
            <span className='Playlists-All-Title'>Playlists</span>
          </div>
          <div className='Playlists-All-Sort-Container'>
            <div className='Playlists-All-Sort-Box'>
              <div className='Playlists-All-Sort-Overlay'></div>
              <h1 className='Playlists-All-Sort'>Sort <IoArrowDown className='Playlists-Play-Icon'/></h1>
            </div>
          </div>

        </div>
  
        <div className='Playlists-Circles-Container'>
      {/* <div className='Playlists-All-Overlay'></div> */}
            {playlists.map((playlist: any, index: any) => 
              <PlaylistsThumbnail key={index} playlist={playlist}/>
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
 {/* <div className='Test-Gradient'></div> */}

 {/* </div> */}


    </div>
  );
};

export default PlaylistsContainer;