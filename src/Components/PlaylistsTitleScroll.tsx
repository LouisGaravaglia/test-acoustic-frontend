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
  updateSelectedTitleIndex: (index: number) => void
}

function PlaylistsTitleScroll({playlist, index, selectedPlaylistIndex, handleScrollToSelectedTitle, updateSelectedTitleIndex}: Props): JSX.Element {
  const titleRef = useRef<any | null>(null);
  let leftSideOfTitleDiv: number = 0;
  let rightSideOfTitleDiv: number = 0;
  if (titleRef.current !== null) {
    const {left, right} = titleRef.current.getBoundingClientRect();
    leftSideOfTitleDiv = left;
    rightSideOfTitleDiv = right;
  }
  const entry = useElementOnScreen(titleRef, {
    root: document.querySelector('.Playlists-Title-Scroll-Container'),
    rootMargin: "0px -300px",
    threshold: 0.40
  });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if(selectedPlaylistIndex === index) handleScrollToSelectedTitle(titleRef);
  }, [titleRef, selectedPlaylistIndex])

  return (
    <div className={isVisible ? 'Playlists-Selected-Title' : 'Playlists-Unselected-Title'} ref={titleRef} onClick={() => updateSelectedTitleIndex(index)}>
      <h2 className={isVisible ? 'Playlists-Selected-Title-Text' : 'Playlists-Unselected-Title-Text'}>{playlist.name}</h2>
    </div>
  );
};

export default PlaylistsTitleScroll;