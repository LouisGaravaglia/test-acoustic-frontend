import React, {useState, useRef, useEffect} from 'react';
import PlaylistsTitleScroll from './PlaylistsTitleScroll';
import useViewport from '../Hooks/useViewport';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  selectedPlaylistTitle: number
}
function PlaylistsTitleScrollContainer({selectedPlaylistTitle}: Props): JSX.Element {
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

  function handleScrollToSelectedTitle(titleRef: any | null) {
    console.log('handleScroll', titleRef);
    // setSelectedPlaylistRef(titleRef);
    if (titleRef.current !== null) {
      console.log('offsetLeft', titleRef.current.offsetLeft);
      
      wrapperRef.current.scroll({left: titleRef.current.offsetLeft - 600, behavior: 'smooth'});
    }
    // titleRef.current.scrollIntoView({behavior: "smooth"});
  }

  //   useEffect(() => {
  //     console.log("trying to scroll");
  //     // wrapperRef.current.scroll({left: 820, behavior: 'smooth'});
  //     // if (titleRef.current !== null) titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

  // }, [selectedPlaylistRef])

  

  return (
    // <div className="scrollingContainer">

    <div className="scrolling-wrapper" ref={wrapperRef}>
      <div className='card' ><h2 ></h2></div>
      {playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} playlist={playlist} parentFinishedMounting={parentFinishedMounting} selectedPlaylistTitle={selectedPlaylistTitle} handleScrollToSelectedTitle={handleScrollToSelectedTitle}/>)}
      <div className='card' ><h2 ></h2></div>

    </div>
    // </div>

  );
};

export default PlaylistsTitleScrollContainer;