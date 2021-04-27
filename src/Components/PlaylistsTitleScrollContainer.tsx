import React, {useState, useRef} from 'react';
import PlaylistsTitleScroll from './PlaylistsTitleScroll';
import useViewport from '../Hooks/useViewport';
let playlists =  require('../fakeData/playlist.json');

function PlaylistsTitleScrollContainer(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {viewportWidth}  = useViewport();

  function observeTitlesInView(index: number) {
    console.log('index in view: ', index);
    
  }

  function handleInViewport(titleRef: any | null, index: number) {
    console.log("hit");
    
    if (titleRef.current === null) return;
    const {left, right} = titleRef.current.getBoundingClientRect();

    const viewportMidPoint = viewportWidth / 2;
    // const enteredFrame = !!entry?.isIntersecting && (left < viewportMidPoint && right > viewportMidPoint);
    const enteredFrame = (left < viewportMidPoint && right > viewportMidPoint);

    setIsVisible(enteredFrame)
    console.log(`enteredFrame ${index}`, enteredFrame);
    
    console.log(`LEFT ${index}`, left);

    console.log('midpoint', viewportMidPoint);
    console.log(`RIGHT ${index}`, right);
    
    // if (enteredFrame) observeTitlesInView(index);
    // return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
  }

  return (
    // <div className="scrollingContainer">

    <div className="scrolling-wrapper" >
      <div className='card' ><h2 ></h2></div>
      {playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} playlist={playlist} handleInViewport={handleInViewport}/>)}
      <div className='card' ><h2 ></h2></div>

    </div>
    // </div>

  );
};

export default PlaylistsTitleScrollContainer;