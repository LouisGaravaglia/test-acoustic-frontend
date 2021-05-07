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
  playlistLength: number
}

function PlaylistsTrack({track, index, selectedTrack, setSelectedTrack, selectedPlaylistIndex, playlistLength}: Props): JSX.Element {
  const [playingTrack, setPlayingTrack] = useState(true);

  useEffect(() => {
    function resetTrackVariables() {
      setPlayingTrack(true);
      setSelectedTrack(0);
    }

    resetTrackVariables();
  }, [track, setPlayingTrack, selectedPlaylistIndex])

  // useEffect(() => {
  //   console.log('useEffect selectedTrack: ', selectedTrack);
    
  // }, [selectedTrack])

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
      border: '1px solid #181718',
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
      <div key={track.track.id} className='Playlists-Track-Container' style={styles} >
        <div className="Playlists-Track-Box" onClick={() => setSelectedTrack(index)}>
          <p className='Playlists-Track-Name'>{track.track.name}</p>
          <p className='Playlists-Artist-Name'>{track.track.artists[0].name}</p>
        </div>
        {selectedTrack === index && playTrackControls}
         {/* { <div className="Playlists-ControlBtns-Container">
            <div className="Playlists-PlayBtn-Box" onClick={skipToPrevTrack}>
              <IoPlaySkipBack className='Playlists-PrevBtn-Icon'/>
            </div>
            <div className="Playlists-PlayBtn-Box" onClick={togglePlayingTrack}>
              {playingTrack ? <IoPauseCircleOutline className='Playlists-PlayBtn-Icon'/> : <IoPlayCircleOutline className='Playlists-PlayBtn-Icon'/>}
            </div>
            <div className="Playlists-PlayBtn-Box">
              <IoPlaySkipForward className='Playlists-NextBtn-Icon' onClick={() => setSelectedTrack(selectedTrack + 1)}/>
            </div>
          </div>} */}
      </div>
    </>
  );
};

export default PlaylistsTrack;