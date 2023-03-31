import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = () => {
    return { height: isClient ? window.innerHeight : undefined };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }
    const handleResize = () => {
      setWindowSize(getSize());
      windowSize;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;
