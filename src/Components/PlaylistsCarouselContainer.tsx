import React, {useState, useEffect} from 'react';
import PlaylistsTitleScrollContainer from './PlaylistsTitleScrollContainer';
import PlaylistsCarousel from './PlaylistsCarousel';
import useViewport from '../Hooks/useViewport';
let playlists =  require('../fakeData/playlist.json');


interface Props {
  refArray: any | null[]
  PlaylistsContainerRef: any | null
}

function PlaylistsCarouselContainer({refArray, PlaylistsContainerRef}: Props): JSX.Element {
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number>(0);
  const [selectedPlaylistTitle, setSelectedPlaylistTitle] = useState<string>("");
  const [largeScreenMode, setLargeScreenMode] = useState<boolean>(true);
  const {viewportWidth}  = useViewport();

  useEffect(() => {
    if (viewportWidth < 883) {
      setLargeScreenMode(false);
    } else {
      setLargeScreenMode(true);
    }
  }, [viewportWidth]);

  function updateSelectedPlaylistIndex(titleIndex: number) {
    console.log('hit selectedIndex', titleIndex);
    
    setSelectedPlaylistIndex(titleIndex);
    setSelectedPlaylistTitle(playlists[titleIndex].name)
  }

  return (
    <>
      <div className='Playlists-Selected-Header-Box'>
        <PlaylistsTitleScrollContainer largeScreenMode={largeScreenMode} selectedPlaylistIndex={selectedPlaylistIndex} selectedPlaylistTitle={selectedPlaylistTitle}/>
      </div>
      <div className='Playlists-Carousel-Content' ref={PlaylistsContainerRef}>
        {playlists.map((playlist: any, index: any) => 
          <PlaylistsCarousel key={index} largeScreenMode={largeScreenMode} playlistRef={refArray[index]} playlist={playlist} index={index} updateSelectedPlaylistIndex={updateSelectedPlaylistIndex} selectedPlaylistIndex={selectedPlaylistIndex}/>
        )}
      </div>
    </>
  );
};

export default PlaylistsCarouselContainer;