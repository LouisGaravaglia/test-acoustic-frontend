import React, {useState, useRef, createRef, useEffect} from 'react';
import PlaylistsTitleScroll from './PlaylistsTitleScroll';
import useViewport from '../Hooks/useViewport';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  selectedPlaylistIndex: number
  selectedPlaylistTitle: string
}
function PlaylistsTitleScrollContainer({selectedPlaylistIndex, selectedPlaylistTitle}: Props): JSX.Element {
  const wrapperRef = useRef<any | null>(null);
  const titleRefArray = playlists.map((playlist:any) => createRef());
  const [largeScreenMode, setLargeScreenMode] = useState<boolean>(true);
  const {viewportWidth}  = useViewport();

  useEffect(() => {
    if (viewportWidth < 883) {
      setLargeScreenMode(false);      
    } else {
      setLargeScreenMode(true);
    }
  }, [viewportWidth]);

  function handleScrollToSelectedTitle(titleRef: any | null) {
    console.log('handleScroll', titleRef);
    if (titleRef.current !== null) {
      console.log('offsetLeft', titleRef.current.offsetLeft);
      //TODO: MAKE MEDIA QUERY THAT LOWER'S THE AMOUNT SUBTRACTING FROM TITLEREF OFFSET VALUE
      wrapperRef.current.scroll({left: titleRef.current.offsetLeft - 300, behavior: 'smooth'});
    }
  }

  let titleDisplayJSX;

  //ONLY CREATE A SLIDING TITLE UX/UI FOR LARGE SCREENS
  if (largeScreenMode) {
    titleDisplayJSX = (
      <div className="scrolling-wrapper" ref={wrapperRef}>
        <div className='Playlists-Unselected-Title' ><h2 ></h2></div>
          {playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} titleRef={titleRefArray[index]} playlist={playlist} selectedPlaylistIndex={selectedPlaylistIndex} handleScrollToSelectedTitle={handleScrollToSelectedTitle}/>)}
        <div className='Playlists-Unselected-Title' ><h2 ></h2></div>
    </div>
    )
  } else {
    titleDisplayJSX = (
      <div>
        <p className="Playlists-Small-Screen-Title">{selectedPlaylistTitle}</p>
      </div>
    )
  }


  return (
    <>
      {titleDisplayJSX}
    </>
  );
};

export default PlaylistsTitleScrollContainer;