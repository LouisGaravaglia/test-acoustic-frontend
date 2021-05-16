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
  const [userClickedTitle, setUserClickedTitle] = useState<boolean>(false);
  const [largeScreenMode, setLargeScreenMode] = useState<boolean>(true);
  const {viewportWidth}  = useViewport();

  useEffect(() => {
    if (viewportWidth < 883) {
      setLargeScreenMode(false);
    } else {
      setLargeScreenMode(true);
    }
  }, [viewportWidth]);

  function handleScrollToSelectedPlaylist(playlistRef: any | null) {
    if (playlistRef.current !== null) {
      PlaylistsContainerRef.current.scroll({left: playlistRef.current.offsetLeft - 400, behavior: 'smooth'});
      setUserClickedTitle(false)
    }
  }

  //USE THIS TO SCROLL TITLE TO CORRECT ONE BASED OFF OF USER NAVIGATING BY SLIDING PLAYLISTS
  function updateSelectedPlaylistIndex(titleIndex: number) {
    setSelectedPlaylistIndex(titleIndex);
    setSelectedPlaylistTitle(playlists[titleIndex].name)
  }

  //USE THIS TO SCROLL PLAYLISTS TO CORRECT ONE BASED OFF OF USER NAVIGATING BY CLICKING ON A TITLE
  function updateSelectedTitleIndex(index: number) {
    setUserClickedTitle(true)
    setSelectedTitleIndex(index);
  }

  return (
    <>
      <div className='Playlists-Selected-Header-Box'>
        <PlaylistsTitleScrollContainer largeScreenMode={largeScreenMode} updateSelectedTitleIndex={updateSelectedTitleIndex} selectedPlaylistIndex={selectedPlaylistIndex} selectedPlaylistTitle={selectedPlaylistTitle}/>
      </div>
      <div className='Playlists-Carousel-Content' ref={PlaylistsContainerRef}>
        {playlists.map((playlist: any, index: any) => 
          <PlaylistsCarousel key={index} largeScreenMode={largeScreenMode} viewportWidth={viewportWidth} playlistRef={refArray[index]} playlist={playlist} index={index} updateSelectedPlaylistIndex={updateSelectedPlaylistIndex} selectedPlaylistIndex={selectedPlaylistIndex} handleScrollToSelectedPlaylist={handleScrollToSelectedPlaylist} selectedTitleIndex={selectedTitleIndex} userClickedTitle={userClickedTitle}/>
        )}
      </div>
    </>
  );
};

export default PlaylistsCarouselContainer;