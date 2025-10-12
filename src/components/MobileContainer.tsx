import { ReactNode, useRef } from "react";
import { MobileContainerContext } from "@/context/MobileContainerContext";

interface MobileContainerProps {
  children: ReactNode;
}

export const MobileContainer = ({ children }: MobileContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <div ref={containerRef} className="w-full max-w-[428px] h-screen bg-background shadow-2xl overflow-hidden relative">
        <MobileContainerContext.Provider value={{ containerRef }}>
          {children}
        </MobileContainerContext.Provider>
      </div>
    </div>
  );
};
