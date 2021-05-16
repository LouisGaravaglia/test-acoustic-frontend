import React, {useRef, createRef} from 'react';
import PlaylistsTitleScroll from './PlaylistsTitleScroll';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  selectedPlaylistIndex: number
  selectedPlaylistTitle: string
  largeScreenMode: boolean
}
function PlaylistsTitleScrollContainer({largeScreenMode, selectedPlaylistIndex, selectedPlaylistTitle}: Props): JSX.Element {
  const wrapperRef = useRef<any | null>(null);
  const titleRefArray = playlists.map((playlist:any) => createRef());

  function handleScrollToSelectedTitle(titleRef: any | null) {
    if (titleRef.current !== null) {
      //TODO: MAKE MEDIA QUERY THAT LOWER'S THE AMOUNT SUBTRACTING FROM TITLEREF OFFSET VALUE
      wrapperRef.current.scroll({left: titleRef.current.offsetLeft - 400, behavior: 'smooth'});
    }
  }

  function handleTitleClick(titleRef: any | null) {
    console.log('clicked title');
    if (titleRef.current !== null) {
      //TODO: MAKE MEDIA QUERY THAT LOWER'S THE AMOUNT SUBTRACTING FROM TITLEREF OFFSET VALUE
      wrapperRef.current.scroll({left: titleRef.current.offsetLeft - 400, behavior: 'smooth'});
    }
  }

  let titleDisplayJSX;

  //ONLY CREATE A SLIDING TITLE UX/UI FOR LARGE SCREENS
  if (largeScreenMode) {
    titleDisplayJSX = (
      <div className="scrolling-wrapper" ref={wrapperRef}>
        <div className='Playlists-Unselected-Title' ><h2 ></h2></div>
          {playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} titleRef={titleRefArray[index]} playlist={playlist} selectedPlaylistIndex={selectedPlaylistIndex} handleScrollToSelectedTitle={handleScrollToSelectedTitle} handleTitleClick={handleTitleClick}/>)}
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