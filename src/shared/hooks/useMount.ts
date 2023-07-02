import { useEffect, useRef } from 'react';

export const useMount = (callback: () => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current();
  }, []);
};
