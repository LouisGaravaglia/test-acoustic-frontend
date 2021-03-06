import React, {useState, useEffect} from 'react';
import {IoPlayCircleOutline, IoPauseCircleOutline, IoPlaySkipForward, IoPlaySkipBack} from 'react-icons/io5';

interface Props {
  track: any
  index: number
  selectedTrack: number
  setSelectedTrack: (index: number) => void
  selectedPlaylistIndex: number
  playlistLength: number
  largeScreenMode: boolean
}

function PlaylistsTrack({largeScreenMode, track, index, selectedTrack, setSelectedTrack, selectedPlaylistIndex, playlistLength}: Props): JSX.Element {
  const [playingTrack, setPlayingTrack] = useState(true);

  //WHEN USER SELECTS A NEW PLAYLIST THE SELECTED TRACK WILL REVERT BACK TO THE FIRST
  useEffect(() => {
    function resetTrackVariables() {
      setPlayingTrack(true);
      setSelectedTrack(0);
    }
    resetTrackVariables();
  }, [track, setPlayingTrack, selectedPlaylistIndex])

  //IF A TRACK IS PAUSED, IT AUTOMATICALLY REVERTS BACK TO PLAYING MODE IF USER SELECTS A NEW TRACK
  useEffect(() => {
    if (playingTrack === false) setPlayingTrack(true);
  }, [selectedTrack, setPlayingTrack])

  function togglePlayingTrack() {
    setPlayingTrack(state => !state)
  }

  let styles: React.CSSProperties;

  if (selectedTrack === index && largeScreenMode) {
    styles = { 
      padding: '40px',
      width: 'calc(100% - 122px)',
      cursor: 'default',
      border: '1px solid #181718',
    };
  } else if (selectedTrack === index && !largeScreenMode) {
    styles = { 
      padding: '40px',
      width: 'calc(100% - 80px)',
      cursor: 'default',
      border: '1px solid #181718',
    };
  } else {
    styles = {};
  }

  let playTrackControls: JSX.Element;

  playTrackControls = (
    <>
      <div className="Playlists-ControlBtns-Container">
        <div className="Playlists-PlayBtn-Box" onClick={() => setSelectedTrack(selectedTrack === 0 ? selectedTrack : selectedTrack - 1)}>
          <IoPlaySkipBack className='Playlists-PrevBtn-Icon'/>
        </div>
        <div className="Playlists-PlayBtn-Box" onClick={togglePlayingTrack}>
          {playingTrack ? <IoPauseCircleOutline className='Playlists-PlayBtn-Icon'/> : <IoPlayCircleOutline className='Playlists-PlayBtn-Icon'/>}
        </div>
        <div className="Playlists-PlayBtn-Box">
          <IoPlaySkipForward className='Playlists-NextBtn-Icon' onClick={() => setSelectedTrack(selectedTrack === playlistLength - 1 ? selectedTrack : selectedTrack + 1)}/>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div key={track.track.id} className='Playlists-Track-Container' style={styles}>
        <div className="Playlists-Track-Box" onClick={() => setSelectedTrack(index)}>
          <p className='Playlists-Track-Name'>{track.track.name}</p>
          <p className='Playlists-Artist-Name'>{track.track.artists[0].name}</p>
        </div>
        {selectedTrack === index && playTrackControls}
      </div>
    </>
  );
};

export default PlaylistsTrack;