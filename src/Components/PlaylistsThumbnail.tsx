import React, {useState, useEffect, useRef} from 'react';
import useMousePosition from '../Hooks/useMousePosition';

interface Props {
  playlist: {
    "id": "playlist_3",
    "name": "Pigeons and Planes 4.19.21"
  }
}

function PlaylistsThumbnail({playlist}: Props): JSX.Element {
  const {x: cursorHorizontalPosition, y: cursorVerticalPosition} = useMousePosition();
  const [cursorInsideDiv, setCursorInsideDiv] = useState<boolean>(false);
  const [bottom, setBottom] = useState<number>(0);
  const [right, setRight] = useState<number>(0);
  const boxRef = useRef<any | null>();

  const horizontalMidPointOfDiv = right - 100;
  const verticalMidPointOfDiv = bottom - 100;
  const translateXPosition = (cursorHorizontalPosition - horizontalMidPointOfDiv) / 4.5;
  const translateYPosition = (cursorVerticalPosition - verticalMidPointOfDiv) / 4.5;

  // useEffect(() => {
  //   function followCursor() {
  //     console.log("mousePosition - x: ", x);
  //     console.log("mousePosition - y: ", y);
  //     console.log("translateXPosition: ", translateXPosition);
  //     console.log("translateYPosition", translateYPosition);
  //   }

  //   if (cursorInsideDiv) followCursor()
  // }, [x, y])

  // function handleMouseEnter() {
  //   setCursorInsideDiv(true);
  //   const {bottom, right} = boxRef.current.getBoundingClientRect();
  //   setBottom(bottom);
  //   setRight(right);
    
  // }

  // function handleMouseLeave() {
  //   setCursorInsideDiv(false);
  // }

  // const boxStyles: React.CSSProperties = {
  //   transform: `translate(${translateXPosition}px, ${translateYPosition}px)`,
  // }

  return (
    // <div ref={boxRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={playlist.id}  className='Playlists-All-Invisible-Box'>
    //   <div className='Playlists-All-Box'  style={cursorInsideDiv ? boxStyles : {}}>
    //     <div className='Playlists-All-Circle'>
    //       <div className='Playlists-All-Circle-Overlay'></div>
    //       <p className='Playlists-Name'>{playlist.name.toUpperCase()} </p>
    //     </div>
    //   </div>
    // </div>

        <div className='Playlists-Playlist-Container'>
        <p className='Playlists-Playlist-Name'>{playlist.name.toUpperCase()} </p>
      </div>

  );
};

export default PlaylistsThumbnail;