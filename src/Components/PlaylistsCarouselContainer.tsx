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
  const [selectedTitleIndex, setSelectedTitleIndex] = useState<number>(0);
  const [largeScreenMode, setLargeScreenMode] = useState<boolean>(true);
  const {viewportWidth}  = useViewport();

  useEffect(() => {
    if (viewportWidth < 883) {
      setLargeScreenMode(false);
    } else {
      setLargeScreenMode(true);
    }
  }, [viewportWidth]);

  //TODO
  function handleScrollToSelectedPlaylist(playlistRef: any | null) {
    if (playlistRef.current !== null) {
      //TODO: MAKE MEDIA QUERY THAT LOWER'S THE AMOUNT SUBTRACTING FROM playlistREF OFFSET VALUE
      PlaylistsContainerRef.current.scroll({left: playlistRef.current.offsetLeft - 400, behavior: 'smooth'});
    }
  }

  function updateSelectedPlaylistIndex(titleIndex: number) {
    setSelectedPlaylistIndex(titleIndex);
    setSelectedPlaylistTitle(playlists[titleIndex].name)
  }

  function updateSelectedTitleIndex(index: number) {
    setSelectedTitleIndex(index);
    // setSelectedTitle(playlists[index].name)
  }

  return (
    <>
      <div className='Playlists-Selected-Header-Box'>
        <PlaylistsTitleScrollContainer largeScreenMode={largeScreenMode} updateSelectedTitleIndex={updateSelectedTitleIndex} selectedPlaylistIndex={selectedPlaylistIndex} selectedPlaylistTitle={selectedPlaylistTitle}/>
      </div>
      <div className='Playlists-Carousel-Content' ref={PlaylistsContainerRef}>
        {playlists.map((playlist: any, index: any) => 
          <PlaylistsCarousel key={index} largeScreenMode={largeScreenMode} playlistRef={refArray[index]} playlist={playlist} index={index} updateSelectedPlaylistIndex={updateSelectedPlaylistIndex} selectedPlaylistIndex={selectedPlaylistIndex} handleScrollToSelectedPlaylist={handleScrollToSelectedPlaylist} selectedTitleIndex={selectedTitleIndex}/>
        )}
      </div>
    </>
  );
};

export default PlaylistsCarouselContainer;