import React, {useContext, useState, useRef, useEffect} from 'react';
import { IoArrowDown } from 'react-icons/io5';
import {MessagesContext} from './ChatBot/MessagesProvider';
// import useMousePosition from '../Hooks/useMousePosition';
import PlaylistsThumbnail from './PlaylistsThumbnail';
import PlaylistsTrack from './PlaylistsTrack';
import PlaylistsTitleScrollContainer from './PlaylistsTitleScrollContainer';
import PlaylistsCarousel from './PlaylistsCarousel';
import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import useElementOnScreen from '../Hooks/useElementOnScreen.tsx';
let playlists =  require('../fakeData/playlist.json');


function PlaylistsCarouselContainer(): JSX.Element {
  // const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const [selectedPlaylistTitle, setSelectedPlaylistTitle] = useState<number>(0);
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

  function updateSelectedPlaylistTitle(titleIndex: number) {
    setSelectedPlaylistTitle(titleIndex);



  }


  return (
    <>
    <div className='Playlists-Selected-Header-Box'>
    <PlaylistsTitleScrollContainer selectedPlaylistTitle={selectedPlaylistTitle}/>
  </div>
  
<div className='Playlists-Carousel-Content'>
{playlists.map((playlist: any, index: any) => 
        <PlaylistsCarousel key={index} playlist={playlist} index={index} updateSelectedPlaylistTitle={updateSelectedPlaylistTitle}/>
      )}
</div>
</>
  );
};

export default PlaylistsCarouselContainer;