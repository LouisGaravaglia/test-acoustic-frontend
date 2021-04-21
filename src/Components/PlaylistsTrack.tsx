import React, {useContext} from 'react';
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
    styles = { top: `${(index * 60) + 40}px`};
  } else if (index > selectedTrack) {
    styles = { top: `${(index * 60) + 80}px`};
  } else {
    styles = { top: `${(index * 60)}px`};
  }

  return (
    <>
      <div key={track.track.id} className='Playlists-Tracks-Box' style={styles} onClick={() => setSelectedTrack(index)}>
        <p className='Playlists-Track-Name'>{track.track.name}</p>
        <p className='Playlists-Artist-Name'>{track.track.artists[0].name}</p>
      </div>
    </>
  );
};

export default PlaylistsTrack;