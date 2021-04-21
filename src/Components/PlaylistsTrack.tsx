import React, {useContext} from 'react';
import {MessagesContext} from './ChatBot/MessagesProvider';
import useMousePosition from '../Hooks/useMousePosition';
import PlaylistsThumbnail from './PlaylistsThumbnail';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  track: any
  index: number
}

function PlaylistsTrack({track, index}: Props): JSX.Element {

  

  
  const styles: React.CSSProperties = {
    top: `${(index * 60)}px`
  }

  return (
      <>
        <div key={track.track.id} className='Playlists-Tracks-Box' style={styles}>
          <p className='Playlists-Track-Name'>{track.track.name}</p>
          <p className='Playlists-Artist-Name'>{track.track.artists[0].name}</p>
        </div>
      </>
  );
};

export default PlaylistsTrack;