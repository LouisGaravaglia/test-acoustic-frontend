import React, {useContext, useState} from 'react';
import { IoIosArrowRoundUp } from 'react-icons/io';
import { IoIosArrowRoundDown } from 'react-icons/io';
import {MessagesContext} from './ChatBot/MessagesProvider';
// import useMousePosition from '../Hooks/useMousePosition';
import PlaylistsThumbnail from './PlaylistsThumbnail';
import PlaylistsTrack from './PlaylistsTrack';
import PlaylistsCarousel from './PlaylistsCarousel';
import PlaylistsTitleScrollContainer from './PlaylistsTitleScrollContainer';
import PlaylistsCarouselContainer from './PlaylistsCarouselContainer'
import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from 'react-icons/fi';
let playlists =  require('../fakeData/playlist.json');



function PlaylistsContainer(): JSX.Element {
  const [selectedTitle, setSelectedTitle] = useState<number>(0);
  const [titleInQueue, setTitleInQueue] = useState<number>(0);
  // const selectedPlaylist = {
  //   selectedTitle: 0,
  //   titleInQueue: 0
  // }
  let tracks = playlists[selectedTitle].tracks.items;

  function updatePlaylistQueue(titleIndex: number) {
    setTitleInQueue(titleIndex);
  } 
  
  function updatePlaylistSelectedTitle(titleIndex: number) {
    if (selectedTitle === titleIndex) setSelectedTitle(titleInQueue);
  }


  return (



    <div className='Playlists-Container'>


      <PlaylistsCarouselContainer />

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

     
        <div className="Playlists-Bottom-Container">

          <div className="Playlists-Sort-Container">
            <p className="Playlists-Sort-Header">Sort all of your playlists by date.</p>
            <div className="Playlists-Sort-Box">
              <p>Sort
              <IoIosArrowRoundUp color='#181718' className='Playlists-Sort-Arrow'/>
              </p>
            </div>
          </div>

          <div className="Playlists-Playlists-All-Container">
          {playlists.map((playlist: any, index: any) => 
              <PlaylistsThumbnail key={index} playlist={playlist}/>
            )}
          </div>

        </div>

      {/* <div className='Playlists-All-Container'>

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
            {playlists.map((playlist: any, index: any) => 
              <PlaylistsThumbnail key={index} playlist={playlist}/>
            )}
        </div>
        
      </div> */}

    </div>
  );
};

export default PlaylistsContainer;