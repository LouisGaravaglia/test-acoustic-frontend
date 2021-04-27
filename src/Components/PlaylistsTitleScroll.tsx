import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import useElementOnScreen from '../Hooks/useElementOnScreen.tsx';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  playlist: {
    "id": string
    "name": string
  }
  // index: number
  // handleScroll: () => void
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

function PlaylistsTitleScroll({playlist}: Props): JSX.Element {
  // const [isVisible, setIsVisible] = useState<boolean>(false);
  const boxRef = useRef<any | null>(null);
  // const entry = useElementOnScreen(boxRef, {
  //   // root: document.querySelector('.scrolling-wrapper'),
  //   rootMargin: "0px -400px",
  //   threshold: 0.9
  // });
  // const isVisible = !!entry?.isIntersecting;
  const entry = useElementOnScreen(boxRef, {
    root: document.querySelector('.scrolling-wrapper'),
    rootMargin: "0px -100px",
    threshold: 0.9
  });
    const isVisible = !!entry?.isIntersecting;


console.log("isVisible: ", isVisible);



  return (
      <div className={isVisible ? 'Playlists-Featured-Title' : 'card'} ref={boxRef}><h2 >{playlist.name}</h2></div>
  );
};

export default PlaylistsTitleScroll;