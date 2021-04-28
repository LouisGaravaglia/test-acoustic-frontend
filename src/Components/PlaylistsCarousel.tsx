import React, {useContext, useState, useRef, useEffect} from 'react';
import { IoArrowDown } from 'react-icons/io5';
import {MessagesContext} from './ChatBot/MessagesProvider';
// import useMousePosition from '../Hooks/useMousePosition';
import PlaylistsThumbnail from './PlaylistsThumbnail';
import PlaylistsTrack from './PlaylistsTrack';
import PlaylistsTitleScrollContainer from './PlaylistsTitleScrollContainer';
import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import useElementOnScreen from '../Hooks/useElementOnScreen';


interface Props {
  playlist: {
    "id": string
    "name": string
    "images": [
      {
          "url": "https://i.scdn.co/image/47421900e7534789603de84c03a40a826c058e45"
      }
    ]
    "tracks": {
        "items": [
        {
          "track": {
              "album": {
                  "images": [
                      {
                          "height": 640,
                          "url": "https://i.scdn.co/image/47421900e7534789603de84c03a40a826c058e45",
                          "width": 640
                      }
                  ],
                  "name": "Illmatic",
                  "type": "album"
              },
              "artists": [
                  {
                      "name": "Nas",
                      "type": "artist"
                  }
              ],
              "name": "The World is Yours",
              "id": "track_4"
          }
      }
        ]
    }
  }
  index: number
  updateSelectedPlaylistIndex: (selectedPlaylist: number) => void
  selectedPlaylistIndex: number
}

function PlaylistsCarousel({playlist, index, updateSelectedPlaylistIndex, selectedPlaylistIndex}: Props): JSX.Element {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const [selectedTitle, setSelectedTitle] = useState<number>(0);
  const [titleInQueue, setTitleInQueue] = useState<number>(0);
  const playlistRef = useRef<any | null>(null);
  const entry = useElementOnScreen(playlistRef, {
    // root: document.querySelector('.scrolling-wrapper'),
    // rootMargin: "0px -300px",
    threshold: 0.8
  });
  const isVisible = !!entry?.isIntersecting;

  
  
  // const selectedPlaylist = {
  //   selectedTitle: 0,
  //   titleInQueue: 0
  // }
  let tracks = playlist.tracks.items;

  useEffect(() => {
    updateSelectedPlaylistIndex(index)
  }, [isVisible]);

  function updateSelectedTrack(trackIndex: number) {
    console.log("trackIndex ", trackIndex);
    
    setSelectedTrack(trackIndex);
  }

  // function updatePlaylistQueue(titleIndex: number) {
  //   setTitleInQueue(titleIndex);
  // } 
  
  // function updatePlaylistSelectedTitle(titleIndex: number) {
  //   if (selectedTitle === titleIndex) setSelectedTitle(titleInQueue);
  // }


  return (




      <div className='Playlists-Selected-Carousel-Content' ref={playlistRef}>



        <div className='Playlists-Artwork-Box'>
          <img className='Playlists-Artwork' src={playlist.images[0].url} alt=''/>
        </div>

        <div className='Playlists-Tracks-Container'>
            {tracks.map((track: any, index: number) => 
              <PlaylistsTrack track={track} key={index} index={index} playlistLength={tracks.length} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} selectedPlaylistIndex={selectedPlaylistIndex}/>
            )}
        </div>



    </div>
  );
};

export default PlaylistsCarousel;