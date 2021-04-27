import React, {useState, useRef} from 'react';
import PlaylistsTitleScroll from './PlaylistsTitleScroll';
let playlists =  require('../fakeData/playlist.json');

function PlaylistsTitleScrollContainer(): JSX.Element {


console.log("hi");


  return (
    // <div className="scrollingContainer">

    <div className="scrolling-wrapper">

      {playlists.map((playlist: any, index: any) => <PlaylistsTitleScroll key={index} playlist={playlist}/>)}

    </div>
    // </div>

  );
};

export default PlaylistsTitleScrollContainer;