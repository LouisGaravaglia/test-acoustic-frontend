import React, {useContext, useState, useRef, useEffect, createRef} from 'react';
import { IoArrowDown } from 'react-icons/io5';
import {MessagesContext} from './ChatBot/MessagesProvider';
// import useMousePosition from '../Hooks/useMousePosition';
import PlaylistsThumbnail from './PlaylistsThumbnail';
import PlaylistsTrack from './PlaylistsTrack';
import PlaylistsTitleScrollContainer from './PlaylistsTitleScrollContainer';
import PlaylistsCarousel from './PlaylistsCarousel';
import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import useElementOnScreen from '../Hooks/useElementOnScreen';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  refArray: any | null[]
  playlistRefToScrollTo: any | null
  PlaylistsContainerRef: any | null
  reversePlaylists: boolean
}

function PlaylistsCarouselContainer({refArray, playlistRefToScrollTo, PlaylistsContainerRef, reversePlaylists}: Props): JSX.Element {
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number>(0);
  const [selectedPlaylistTitle, setSelectedPlaylistTitle] = useState<string>('');
  // const [titleInQueue, setTitleInQueue] = useState<number>(0);
  // const playlistRef = useRef<any | null>(null);
  // const entry = useElementOnScreen(playlistRef, {
  //   // root: document.querySelector('.scrolling-wrapper'),
  //   // rootMargin: "0px -300px",
  //   threshold: 0.9
  // });
  // const isVisible = !!entry?.isIntersecting;
  // console.log(`index ${index} - ${isVisible}`);
  
  // const selectedPlaylist = {
  //   selectedTitle: 0,
  //   titleInQueue: 0
  // }
  // let tracks = playlist.tracks.items;

  // function updatePlaylistQueue(titleIndex: number) {
  //   setTitleInQueue(titleIndex);
  // } 
  
  // function updatePlaylistSelectedTitle(titleIndex: number) {
  //   if (selectedTitle === titleIndex) setSelectedTitle(titleInQueue);
  // }

  

  // useEffect(() => {
  //   updateSelectedPlaylistIndex(index)
  // }, [isVisible]);


  function updateSelectedPlaylistIndex(titleIndex: number) {
    setSelectedPlaylistIndex(titleIndex);
    // setSelectedPlaylistTitle()
  }

  let displayedPlaylists;

  if (reversePlaylists) {
    displayedPlaylists = (
      playlists.map((playlist: any, index: any) => 
        <PlaylistsCarousel key={index} playlistRef={refArray[index]} playlist={playlist} index={index} updateSelectedPlaylistIndex={updateSelectedPlaylistIndex} selectedPlaylistIndex={selectedPlaylistIndex}/>
      ).reverse()
    )
  } else {
    displayedPlaylists = (
      playlists.map((playlist: any, index: any) => 
        <PlaylistsCarousel key={index} playlistRef={refArray[index]} playlist={playlist} index={index} updateSelectedPlaylistIndex={updateSelectedPlaylistIndex} selectedPlaylistIndex={selectedPlaylistIndex}/>
      )
    )
  }


  return (
    <>
    <div className='Playlists-Selected-Header-Box'>
    <PlaylistsTitleScrollContainer selectedPlaylistIndex={selectedPlaylistIndex} reversePlaylists={reversePlaylists}/>
  </div>
  
<div className='Playlists-Carousel-Content' ref={PlaylistsContainerRef}>
{/* {playlists.map((playlist: any, index: any) => 
        <PlaylistsCarousel key={index} playlistRef={refArray[index]} playlist={playlist} index={index} updateSelectedPlaylistIndex={updateSelectedPlaylistIndex} selectedPlaylistIndex={selectedPlaylistIndex}/>
      )} */}
      {displayedPlaylists}
</div>
</>
  );
};

export default PlaylistsCarouselContainer;