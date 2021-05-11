import React, {useState} from 'react';
import PlaylistsTitleScrollContainer from './PlaylistsTitleScrollContainer';
import PlaylistsCarousel from './PlaylistsCarousel';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  refArray: any | null[]
  PlaylistsContainerRef: any | null
}

function PlaylistsCarouselContainer({refArray, PlaylistsContainerRef}: Props): JSX.Element {
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number>(0);
  const [selectedPlaylistTitle, setSelectedPlaylistTitle] = useState<string>("");

  function updateSelectedPlaylistIndex(titleIndex: number) {
    setSelectedPlaylistIndex(titleIndex);
    setSelectedPlaylistTitle(playlists[titleIndex].name)
  }

  return (
    <>
      <div className='Playlists-Selected-Header-Box'>
        <PlaylistsTitleScrollContainer selectedPlaylistIndex={selectedPlaylistIndex} selectedPlaylistTitle={selectedPlaylistTitle}/>
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