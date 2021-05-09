import React, {useState} from 'react';
import PlaylistsTitleScrollContainer from './PlaylistsTitleScrollContainer';
import PlaylistsCarousel from './PlaylistsCarousel';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  refArray: any | null[]
  PlaylistsContainerRef: any | null
  reversePlaylists: boolean
}

function PlaylistsCarouselContainer({refArray, PlaylistsContainerRef, reversePlaylists}: Props): JSX.Element {
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number>(0);

  function updateSelectedPlaylistIndex(titleIndex: number) {
    setSelectedPlaylistIndex(titleIndex);
  }

  return (
    <>
      <div className='Playlists-Selected-Header-Box'>
        <PlaylistsTitleScrollContainer selectedPlaylistIndex={selectedPlaylistIndex} reversePlaylists={reversePlaylists}/>
      </div>
      <div className='Playlists-Carousel-Content' ref={PlaylistsContainerRef}>
        {playlists.map((playlist: any, index: any) => 
          <PlaylistsCarousel key={index} playlistRef={refArray[index]} playlist={playlist} index={index} updateSelectedPlaylistIndex={updateSelectedPlaylistIndex} selectedPlaylistIndex={selectedPlaylistIndex}/>
        )}
      </div>
    </>
  );
};

export default PlaylistsCarouselContainer;