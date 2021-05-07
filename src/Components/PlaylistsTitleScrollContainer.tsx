import React, {useState, useRef, useEffect, createRef} from 'react';
import PlaylistsTitleScroll from './PlaylistsTitleScroll';
import useViewport from '../Hooks/useViewport';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  selectedPlaylistIndex: number
  reversePlaylists: boolean
}
function PlaylistsTitleScrollContainer({selectedPlaylistIndex, reversePlaylists}: Props): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [parentFinishedMounting, setParentFinishedMounting] = useState<boolean>(false);
  const [selectedPlaylistRef, setSelectedPlaylistRef] = useState<any | null>(null);
  const {viewportWidth}  = useViewport();
  const titleRef = useRef<any | null>(null);
  const wrapperRef = useRef<any | null>(null);

  function observeTitlesInView(index: number) {
    console.log('index in view: ', index);
    
  }

  // function handleInViewport(titleRef: any | null, index: number) {
  //   console.log("hit");
    
  //   if (titleRef.current === null) return;
  //   const {left, right} = titleRef.current.getBoundingClientRect();

  //   const viewportMidPoint = viewportWidth / 2;
  //   // const enteredFrame = !!entry?.isIntersecting && (left < viewportMidPoint && right > viewportMidPoint);
  //   const enteredFrame = (left < viewportMidPoint && right > viewportMidPoint);

  //   setIsVisible(enteredFrame)
  //   console.log(`enteredFrame ${index}`, enteredFrame);
    
  //   console.log(`LEFT ${index}`, left);

  //   console.log('midpoint', viewportMidPoint);
  //   console.log(`RIGHT ${index}`, right);
    
  //   // if (enteredFrame) observeTitlesInView(index);
  //   // return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
  // }

  // useEffect(() => {

  //   const scrollPastCategories = () => {
  //     DanceabilitySearchRef.current.scrollIntoView({behavior: "smooth"});
  //   }
  //   scrollPastCategories();
  // }, [selectedTitle]);

  // useEffect(() => {
  //   function parentDidMount() {
  //     setParentFinishedMounting(true)
  //   }

  //   parentDidMount();
  // }, [])

  const titleRefArray = playlists.map((playlist:any) => createRef());

  
  function handleScrollToSelectedTitle(titleRef: any | null) {
    console.log('handleScroll', titleRef);
    if (titleRef.current !== null) {
      console.log('offsetLeft', titleRef.current.offsetLeft);
      //TODO: MAKE MEDIA QUERY THAT LOWER'S THE AMOUNT SUBTRACTING FROM TITLEREF OFFSET VALUE
      // titleRef.current.scrollIntoView();
      wrapperRef.current.scroll({left: titleRef.current.offsetLeft - 300, behavior: 'smooth'});
    }
  }


  //   useEffect(() => {
  //     console.log("trying to scroll");
  //     // wrapperRef.current.scroll({left: 820, behavior: 'smooth'});
  //     // if (titleRef.current !== null) titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

  // }, [selectedPlaylistRef])

  // let playlistTitles;

  // if (reversePlaylists) {
  //   playlistTitles = (
  //     playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} titleRef={titleRefArray[index]} playlist={playlist} parentFinishedMounting={parentFinishedMounting} selectedPlaylistIndex={selectedPlaylistIndex} handleScrollToSelectedTitle={handleScrollToSelectedTitle} reversePlaylists={reversePlaylists} wrapperRef={wrapperRef}/>).reverse()
  //   )
  // } else {
  //   playlistTitles = (
  //     playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} titleRef={titleRefArray[index]} playlist={playlist} parentFinishedMounting={parentFinishedMounting} selectedPlaylistIndex={selectedPlaylistIndex} handleScrollToSelectedTitle={handleScrollToSelectedTitle} reversePlaylists={reversePlaylists} wrapperRef={wrapperRef}/>)
  //   )
  // }
  

  return (
    // <div className="scrollingContainer">

    <div className="scrolling-wrapper" ref={wrapperRef}>
      <div className='card' ><h2 ></h2></div>
      {/* {playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} playlist={playlist} parentFinishedMounting={parentFinishedMounting} selectedPlaylistIndex={selectedPlaylistIndex} handleScrollToSelectedTitle={handleScrollToSelectedTitle}/>)} */}
      {/* {playlistTitles} */}
      {playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} titleRef={titleRefArray[index]} playlist={playlist} parentFinishedMounting={parentFinishedMounting} selectedPlaylistIndex={selectedPlaylistIndex} handleScrollToSelectedTitle={handleScrollToSelectedTitle} reversePlaylists={reversePlaylists} wrapperRef={wrapperRef}/>)}
      <div className='card' ><h2 ></h2></div>

    </div>
    // </div>

  );
};

export default PlaylistsTitleScrollContainer;