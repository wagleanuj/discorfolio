'use client';

import { FC, useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

interface MinLoadingScreenProps {
  children: React.ReactNode;
  minLoadTime?: number;
}

export const MinLoadingScreen: FC<MinLoadingScreenProps> = ({ 
  children, 
  minLoadTime = 2000 // 2 seconds default
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [minLoadTime]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default MinLoadingScreen; 