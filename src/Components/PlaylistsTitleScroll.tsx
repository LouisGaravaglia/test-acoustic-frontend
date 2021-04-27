import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import useViewport from '../Hooks/useViewport';
import useElementOnScreen from '../Hooks/useElementOnScreen.tsx';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  playlist: {
    "id": string
    "name": string
  }
  index: number
  handleInViewport: (titleRef: any | null, index: number) => void
  // // boxRef: React.Ref<HTMLInputElement>
  // titleInsideBoundary: boolean
  // titleContainerRef: {
  //   current: React.Ref<HTMLInputElement>
  // }
}

// interface IUseElementOnScreen {
//   containerRef: React.Ref<HTMLInputElement>
//   isVisible: boolean
// }

function PlaylistsTitleScroll({playlist, handleInViewport, index}: Props): JSX.Element {
  // const [isVisible, setIsVisible] = useState<boolean>(false);
  const titleRef = useRef<any | null>(null);
  let leftSideOfTitleDiv: number = 0;
  let rightSideOfTitleDiv: number = 0;
  if (titleRef.current !== null) {
    const {left, right} = titleRef.current.getBoundingClientRect();
    leftSideOfTitleDiv = left;
    rightSideOfTitleDiv = right;
  }
  const {viewportWidth}  = useViewport();
  const viewportMidPoint = viewportWidth / 2;
  // const entry = useElementOnScreen(titleRef, {
  //   // root: document.querySelector('.scrolling-wrapper'),
  //   rootMargin: "0px -400px",
  //   threshold: 0.9
  // });
  // const isVisible = !!entry?.isIntersecting;
  const entry = useElementOnScreen(titleRef, {
    root: document.querySelector('.scrolling-wrapper'),
    rootMargin: "0px -300px",
    threshold: 0.40
  });
  const isVisible = !!entry?.isIntersecting;

    // useEffect(() => {

    //   handleInViewport(titleRef, index);
    // }, [titleRef, enteredFrame])

    // handleInViewport(titleRef);

    // const top = titleRef.current.getBoundingClientRect().top;
    // const enteredFrame = !!entry?.isIntersecting && (top > 143 && top < 144);
  // titleRef.current = index;

    // useEffect(() => {
    //   function isInViewport() {
    //     // if (!titleRef) return false;
        
    //     // const enteredFrame = !!entry?.isIntersecting && (leftSideOfTitleDiv < viewportMidPoint && rightSideOfTitleDiv > viewportMidPoint);
    //     const touchingMidPoint = (leftSideOfTitleDiv < viewportMidPoint && rightSideOfTitleDiv > viewportMidPoint);

    //     setIsVisible(touchingMidPoint)
    //     // console.log(`touchingMidPoint ${index}`, enteredFrame);
        
    //     console.log(`leftSideOfTitleDiv ${index}`, leftSideOfTitleDiv);
    
    //     console.log('midpoint', viewportMidPoint);
    //     console.log(`rightSideOfTitleDiv ${index}`, rightSideOfTitleDiv);
        

    //   }

    //   isInViewport();
    // }, [titleRef, setIsVisible, leftSideOfTitleDiv, rightSideOfTitleDiv])


      // function isInViewport(offset = 0) {
      //   console.log("hit");
        
      //   if (!titleRef) return false;
      //   const {left, right} = titleRef.current.getBoundingClientRect();
      //   // const enteredFrame = !!entry?.isIntersecting && (left < viewportMidPoint && right > viewportMidPoint);
      //   const enteredFrame = (left < viewportMidPoint && right > viewportMidPoint);

      //   setIsVisible(enteredFrame)
      //   console.log(`index ${index}`, left);
      //   console.log('midpoint', viewportMidPoint);
        
      //   if (enteredFrame) observeTitlesInView(index);
      //   // return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
      // }


// console.log("isVisible: ", isVisible);



  return (
      <div className={isVisible ? 'Playlists-Featured-Title' : 'card'} ref={titleRef} ><h2 >{playlist.name}</h2></div>
  );
};

export default PlaylistsTitleScroll;