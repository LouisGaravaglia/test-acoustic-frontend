import React, {useState, createRef, useRef} from 'react';
import {IoIosArrowRoundUp} from 'react-icons/io';
import {IoIosArrowRoundDown} from 'react-icons/io';
import PlaylistsThumbnail from './PlaylistsThumbnail';
import PlaylistsCarouselContainer from './PlaylistsCarouselContainer'
let playlists =  require('../fakeData/playlist.json');

function PlaylistsContainer(): JSX.Element {
  const [reversePlaylists, setReversePlaylists] = useState<boolean>(false);
  const PlaylistsContainerRef = useRef<any | null>(null);
  const containerRef = useRef<any | null>(null);
  const refArray = playlists.map((playlist:any) => createRef());

  function selectWhichPlaylistToNavigateTo(refIndex:number) {
    refArray[refIndex].current.scrollIntoView({block: 'nearest', inline: 'start' });
    setTimeout(() => {
      containerRef.current.scrollIntoView({behavior: "smooth"});
    }, 100);
  }

  let playlistsJSX;

  if (reversePlaylists) {
    playlistsJSX = (
      playlists.map((playlist: any, index: any) => 
        <PlaylistsThumbnail key={index} playlist={playlist} index={index} selectWhichPlaylistToNavigateTo={selectWhichPlaylistToNavigateTo}/>
      ).reverse()
    );
  } else {
    playlistsJSX = (
      playlists.map((playlist: any, index: any) => 
        <PlaylistsThumbnail key={index} playlist={playlist} index={index} selectWhichPlaylistToNavigateTo={selectWhichPlaylistToNavigateTo}/>
      )
    );
  }

  return (
    <div className='Playlists-Container' ref={containerRef}>
      <PlaylistsCarouselContainer refArray={refArray} PlaylistsContainerRef={PlaylistsContainerRef} reversePlaylists={reversePlaylists}/>
      <div className="Playlists-Bottom-Container">
        <div className="Playlists-Sort-Container">
          <p className="Playlists-Sort-Header">Sort all of your playlists by date.</p>
          <div className="Playlists-Sort-Box" onClick={() => setReversePlaylists(state => !state)}>
            <p>Sort
            {reversePlaylists ? <IoIosArrowRoundDown color='#181718' className='Playlists-Sort-Arrow-Down'/> : <IoIosArrowRoundUp color='#181718' className='Playlists-Sort-Arrow-Up'/>}
            </p>
          </div>
        </div>
        <div className="Playlists-Playlists-All-Container">
          {playlistsJSX}
        </div>
      </div>
    </div>
  );
};

export default PlaylistsContainer;