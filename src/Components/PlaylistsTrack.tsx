import React, {useState, useEffect} from 'react';
import { IoPlayCircleOutline, IoPauseCircleOutline, IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import {MessagesContext} from './ChatBot/MessagesProvider';
import useMousePosition from '../Hooks/useMousePosition';
import PlaylistsThumbnail from './PlaylistsThumbnail';
let playlists =  require('../fakeData/playlist.json');

interface Props {
  track: any
  index: number
  selectedTrack: number
  setSelectedTrack: (index: number) => void
  selectedPlaylistIndex: number
}

function PlaylistsTrack({track, index, selectedTrack, setSelectedTrack, selectedPlaylistIndex}: Props): JSX.Element {
  const [playingTrack, setPlayingTrack] = useState(true);

  useEffect(() => {
    function resetTrackVariables() {
      setPlayingTrack(true);
      setSelectedTrack(0);
    }

    resetTrackVariables();
  }, [track, setPlayingTrack, selectedPlaylistIndex])

  function togglePlayingTrack() {
    setPlayingTrack(state => !state)
  }

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
    <div className="Playlists-ControlBtns-Container">
      <div className="Playlists-PlayBtn-Box">
        <IoPlaySkipBack className='Playlists-PrevBtn-Icon'/>
      </div>
      <div className="Playlists-PlayBtn-Box" onClick={togglePlayingTrack}>
        {playingTrack ? <IoPauseCircleOutline className='Playlists-PlayBtn-Icon'/> : <IoPlayCircleOutline className='Playlists-PlayBtn-Icon'/>}
      </div>
      <div className="Playlists-PlayBtn-Box">
        <IoPlaySkipForward className='Playlists-NextBtn-Icon'/>
      </div>
    </div>
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