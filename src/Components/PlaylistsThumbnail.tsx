import React, {useState, useEffect} from 'react';
import useMousePosition from '../Hooks/useMousePosition';

interface Props {
  playlist: {
    "id": "playlist_3",
    "name": "Pigeons and Planes 4.19.21"
  }
}

function PlaylistsThumbnail({playlist}: Props): JSX.Element {
  const {x, y} = useMousePosition();
  const [cursorInsideDiv, setCursorInsideDiv] = useState<boolean>(false);
  const [initialXValue, setInitialXValue] = useState<number>(0);
  const [initialYValue, setInitialYValue] = useState<number>(0);
  // const [cursorXPosition, setCursorXPosition] = useState<number>(0);
  // const [cursorYPosition, setCursorYPosition] = useState<number>(0);

  // useEffect(() => {
  //   function makeSureCoordinatesNotNull() {
  //     setCursorXPosition(x === null ? 0 : x);
  //     setCursorYPosition(y === null ? 0 : y);
  //   }

  //   if (cursorInsideDiv) followCursor()
  // }, [])

  useEffect(() => {
    function followCursor() {
      console.log("mousePosition - x: ", x);
      console.log("mousePosition - y: ", y);
    }

    if (cursorInsideDiv) followCursor()
  }, [x, y])

  function handleMouseEnter() {
    setCursorInsideDiv(true);
    setInitialXValue(x);
    setInitialYValue(y);
  }

  function handleMouseLeave() {
    setCursorInsideDiv(false);
  }


  const styles: React.CSSProperties = {
    transform: `translate(${x - initialXValue}px, ${y - initialYValue}px)`
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={playlist.id} style={cursorInsideDiv ? styles : {}} className='Playlists-All-Box'>
      <p className='Playlists-Name'>{playlist.name.toUpperCase()}</p>
    </div>
  );
};

export default PlaylistsThumbnail;