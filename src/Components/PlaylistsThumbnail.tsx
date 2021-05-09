import React from 'react';

interface Props {
  playlist: {
    "id": "playlist_3",
    "name": "Pigeons and Planes 4.19.21"
  }
  selectWhichPlaylistToNavigateTo: (refIndex:number) => void
  index: number
}

function PlaylistsThumbnail({playlist, selectWhichPlaylistToNavigateTo, index}: Props): JSX.Element {

  return (
    <div className='Playlists-Playlist-Container' onClick={() => selectWhichPlaylistToNavigateTo(index)}>
      <p className='Playlists-Playlist-Name'>{playlist.name.toUpperCase()} </p>
    </div>
  );
};

export default PlaylistsThumbnail;