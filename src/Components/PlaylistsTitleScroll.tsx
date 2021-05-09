import React, {useRef, useEffect} from 'react';
import useElementOnScreen from '../Hooks/useElementOnScreen';

interface Props {
  playlist: {
    "id": string
    "name": string
  }
  index: number
  selectedPlaylistIndex: number
  handleScrollToSelectedTitle: (titleRef: any | null) => void
  titleRef: any | null
}

function PlaylistsTitleScroll({playlist, index, selectedPlaylistIndex, handleScrollToSelectedTitle}: Props): JSX.Element {
  const titleRef = useRef<any | null>(null);
  let leftSideOfTitleDiv: number = 0;
  let rightSideOfTitleDiv: number = 0;
  if (titleRef.current !== null) {
    const {left, right} = titleRef.current.getBoundingClientRect();
    leftSideOfTitleDiv = left;
    rightSideOfTitleDiv = right;
  }
  const entry = useElementOnScreen(titleRef, {
    root: document.querySelector('.scrolling-wrapper'),
    rootMargin: "0px -300px",
    threshold: 0.40
  });
  const isVisible = !!entry?.isIntersecting;

    useEffect(() => {
      if(selectedPlaylistIndex === index) handleScrollToSelectedTitle(titleRef);
    }, [titleRef, selectedPlaylistIndex])

  return (
    <div className={isVisible ? 'Playlists-Featured-Title' : 'card'} ref={titleRef} >
      <h2>{playlist.name}</h2>
    </div>
  );
};

export default PlaylistsTitleScroll;