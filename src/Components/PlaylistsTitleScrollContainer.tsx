import React, {useState, useRef, createRef} from 'react';
import PlaylistsTitleScroll from './PlaylistsTitleScroll';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  selectedPlaylistIndex: number
  reversePlaylists: boolean
}
function PlaylistsTitleScrollContainer({selectedPlaylistIndex, reversePlaylists}: Props): JSX.Element {
  const [parentFinishedMounting, setParentFinishedMounting] = useState<boolean>(false);
  const wrapperRef = useRef<any | null>(null);
  const titleRefArray = playlists.map((playlist:any) => createRef());

  function handleScrollToSelectedTitle(titleRef: any | null) {
    console.log('handleScroll', titleRef);
    if (titleRef.current !== null) {
      console.log('offsetLeft', titleRef.current.offsetLeft);
      //TODO: MAKE MEDIA QUERY THAT LOWER'S THE AMOUNT SUBTRACTING FROM TITLEREF OFFSET VALUE
      wrapperRef.current.scroll({left: titleRef.current.offsetLeft - 300, behavior: 'smooth'});
    }
  }

  return (
    <div className="scrolling-wrapper" ref={wrapperRef}>
      <div className='card' ><h2 ></h2></div>
        {playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} titleRef={titleRefArray[index]} playlist={playlist} selectedPlaylistIndex={selectedPlaylistIndex} handleScrollToSelectedTitle={handleScrollToSelectedTitle}/>)}
      <div className='card' ><h2 ></h2></div>
    </div>
  );
};

export default PlaylistsTitleScrollContainer;