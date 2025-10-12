import { createContext, useContext, RefObject } from 'react';

interface MobileContainerContextType {
  containerRef: RefObject<HTMLDivElement> | null;
}

export const MobileContainerContext = createContext<MobileContainerContextType>({ containerRef: null });

export const useMobileContainer = () => {
  const context = useContext(MobileContainerContext);
  if (context === undefined) {
    throw new Error('useMobileContainer must be used within a MobileContainerProvider');
  }
  return context;
};
