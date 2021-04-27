import React, {useState, useRef, useEffect} from 'react';
import PlaylistsTitleScroll from './PlaylistsTitleScroll';
import useViewport from '../Hooks/useViewport';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  updatePlaylistQueue: (titleIndex: number) => void
  updatePlaylistSelectedTitle: (titleIndex: number) => void
}
function PlaylistsTitleScrollContainer({updatePlaylistQueue, updatePlaylistSelectedTitle}: Props): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [parentFinishedMounting, setParentFinishedMounting] = useState<boolean>(false);
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

  useEffect(() => {
    function parentDidMount() {
      setParentFinishedMounting(true)
    }

    parentDidMount();
  }, [])

  return (
    // <div className="scrollingContainer">

    <div className="scrolling-wrapper" >
      <div className='card' ><h2 ></h2></div>
      {playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} index={index} playlist={playlist} parentFinishedMounting={parentFinishedMounting} updatePlaylistSelectedTitle={updatePlaylistSelectedTitle} updatePlaylistQueue={updatePlaylistQueue}/>)}
      <div className='card' ><h2 ></h2></div>

    </div>
    // </div>

  );
};

export default PlaylistsTitleScrollContainer;