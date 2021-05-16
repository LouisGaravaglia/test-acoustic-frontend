import React, {useState, useEffect} from 'react';
import PlaylistsTrack from './PlaylistsTrack';
import useElementOnScreen from '../Hooks/useElementOnScreen';
import PLACEHOLDER_IMG_0 from '../images/placeholder_1.jpg';
import PLACEHOLDER_IMG_1 from '../images/placeholder_2.jpg';
import PLACEHOLDER_IMG_2 from '../images/placeholder_3.jpg';
import PLACEHOLDER_IMG_3 from '../images/placeholder_4.jpg';
import PLACEHOLDER_IMG_4 from '../images/placeholder_5.jpg';
import PLACEHOLDER_IMG_5 from '../images/placeholder_6.jpg';


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
  playlistRef: any | null
  largeScreenMode: boolean
  handleScrollToSelectedPlaylist: (playlistRef: any | null) => void
  selectedTitleIndex: number
  userClickedTitle: boolean
  viewportWidth: number
}

function PlaylistsCarousel({largeScreenMode, playlist, index, viewportWidth, updateSelectedPlaylistIndex, selectedPlaylistIndex, playlistRef, handleScrollToSelectedPlaylist, selectedTitleIndex, userClickedTitle}: Props): JSX.Element {
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const playlistImgPlaceholders = [PLACEHOLDER_IMG_0, PLACEHOLDER_IMG_1, PLACEHOLDER_IMG_2, PLACEHOLDER_IMG_3, PLACEHOLDER_IMG_4, PLACEHOLDER_IMG_5];
  const entry = useElementOnScreen(playlistRef, {
    threshold: viewportWidth < 1990 ? 0.6 : 0.4
  });
  const isVisible = !!entry?.isIntersecting;
  let tracks = playlist.tracks.items;

  useEffect(() => {
    if(selectedTitleIndex === index && userClickedTitle) handleScrollToSelectedPlaylist(playlistRef);
  }, [playlistRef, selectedTitleIndex, handleScrollToSelectedPlaylist, userClickedTitle, index])

  useEffect(() => {
    if (isVisible) updateSelectedPlaylistIndex(index);
  }, [isVisible, updateSelectedPlaylistIndex, index]);



  let artworkJSX;

  if (largeScreenMode) {
    artworkJSX = (
      <div className='Playlists-Artwork-Box'>
        <img className='Playlists-Artwork' src={playlistImgPlaceholders[index]} alt=''/>
      </div>
    )
  } else {
    artworkJSX = (
      <></>
    )
  }

  return (
    <div className='Playlists-Carousel-Container' ref={playlistRef}>
      <div className="Playlists-Carousel-Box">
        {artworkJSX}
        <div className='Playlists-Tracks-Container'>
            {tracks.map((track: any, index: number) => 
              <PlaylistsTrack largeScreenMode={largeScreenMode} track={track} key={index} index={index} playlistLength={tracks.length} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} selectedPlaylistIndex={selectedPlaylistIndex}/>
            )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistsCarousel;