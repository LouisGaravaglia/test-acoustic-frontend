import React, {useContext} from 'react';
import { IoPlayCircleOutline } from 'react-icons/io5';
import {MessagesContext} from './ChatBot/MessagesProvider';
import useMousePosition from '../Hooks/useMousePosition';
import PlaylistsThumbnail from './PlaylistsThumbnail';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  track: any
  index: number
  selectedTrack: number
  setSelectedTrack: (index: number) => void
}

function PlaylistsTrack({track, index, selectedTrack, setSelectedTrack}: Props): JSX.Element {

  let styles: React.CSSProperties;

  if (selectedTrack === index){
    styles = { 
      top: `${(index * 60)}px`,
      padding: '40px',
      left: '-40px',
      width: 'calc(100% - 120px)',
      cursor: 'default',
      backgroundImage: "linear-gradient(to right, rgba(154, 255, 233, 0.842), #ffe0d7)",
    };
  } else if (index > selectedTrack) {
    styles = { top: `${(index * 60) + 80}px`};
  } else {
    styles = { top: `${(index * 60)}px`};
  }

  let playTrackControls: JSX.Element;

  playTrackControls = (
    <>
      {/* <div className="Playlists-Play-Box">
        <IoPlayCircleOutline className='Playlists-Play-Icon'/>
      </div> */}
    </>
  )

  return (
    <>
      <div key={track.track.id} className='Playlists-Track-Container' style={styles} onClick={() => setSelectedTrack(index)}>
        <div className="Playlists-Track-Box">
          <p className='Playlists-Track-Name'>{track.track.name}</p>
          <p className='Playlists-Artist-Name'>{track.track.artists[0].name}</p>
        </div>
        {selectedTrack === index && playTrackControls}
      </div>
    </>
  );
};

export default PlaylistsTrack;