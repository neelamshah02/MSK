import { useRef, useEffect } from 'react';

const useIsMounted = () => {
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
  }, []);
  return isMountedRef.current;
};

export default useIsMounted;
