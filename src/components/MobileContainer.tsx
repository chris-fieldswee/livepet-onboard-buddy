import { ReactNode } from "react";

interface MobileContainerProps {
  children: ReactNode;
}

export const MobileContainer = ({ children }: MobileContainerProps) => {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-[428px] min-h-screen bg-background shadow-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};
