import { useEffect } from 'react';

interface IsClickableInterface {
  wrapperRef: React.RefObject<any>;
  callback: (state: boolean) => void;
  turnedOn: boolean;
  extraDeps?: any[];
}

const useIsClickedInside = ({
  wrapperRef,
  callback,
  turnedOn,
  extraDeps = []
}: IsClickableInterface) => {
  useEffect(() => {
    if (!turnedOn) return;

    const handleClickInsideMenu = (event?: any): void => {
      if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
        callback(true);
      } else callback(false);
    };
    document.addEventListener('mousedown', handleClickInsideMenu);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('mousedown', handleClickInsideMenu);
    };
    // eslint-disable-next-line
  }, [wrapperRef, callback, turnedOn, ...extraDeps]);
};

export default useIsClickedInside;
