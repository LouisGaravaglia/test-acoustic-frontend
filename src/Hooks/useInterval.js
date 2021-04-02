import React, {useRef, useEffect} from "react";

const useInterval = (callback, delay, myRef) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {

    function tick() {
      savedCallback.current();
    };

    if (delay !== null) {
      myRef.current = setInterval(tick, delay);
      return () => clearInterval(myRef.current);
    };
  }, [delay]);
};

export default useInterval;