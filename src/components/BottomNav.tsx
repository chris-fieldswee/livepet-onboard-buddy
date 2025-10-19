import { useNavigate, useLocation } from "react-router-dom";
import { Home, Plus, Heart, Activity, FileText, HeartPulse, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerPortal } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useMobileContainer } from "@/context/MobileContainerContext";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { containerRef } = useMobileContainer();

  const navItems = [
    { icon: Home, label: "Pet", path: "/" },
    { icon: Heart, label: "Feed", path: "/feed" },
  ];

  const LeftIcon = navItems[0].icon;
  const RightIcon = navItems[1].icon;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[428px] bg-background border-t z-50">
      <div className="flex items-center justify-around h-16 px-4">
        <button
          onClick={() => navigate(navItems[0].path)}
          className={cn(
            "flex flex-col items-center justify-center space-y-1 flex-1 h-full transition-colors",
            location.pathname === navItems[0].path ? "text-primary" : "text-muted-foreground"
          )}
        >
          <LeftIcon className="w-6 h-6" />
          <span className="text-xs font-medium">{navItems[0].label}</span>
        </button>

        <Drawer>
          <DrawerTrigger asChild>
            <button className="flex flex-col items-center justify-center space-y-1 flex-1 h-full text-primary">
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center -mt-8 border-4 border-background">
                <Plus className="w-8 h-8" />
              </div>
              <span className="text-xs font-medium -mt-1">Record</span>
            </button>
          </DrawerTrigger>
          <DrawerPortal container={containerRef?.current ?? undefined}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>What would you like to record?</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-2">
                <Button variant="outline" className="w-full justify-start h-14" onClick={() => navigate('/record-activity')}>
                  <Activity className="mr-2" />
                  <div>
                    <p className="font-semibold">Shareable Activity</p>
                    <p className="font-normal text-muted-foreground text-sm">Walk, training, playtime for the feed</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-14" onClick={() => navigate('/log-activity')}>
                  <FileText className="mr-2" />
                  <div>
                    <p className="font-semibold">Quick Log</p>
                    <p className="font-normal text-muted-foreground text-sm">Food, water, potty, notes, etc.</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-14" onClick={() => navigate('/health-records')}>
                  <HeartPulse className="mr-2" />
                   <div>
                    <p className="font-semibold">Health Record</p>
                    <p className="font-normal text-muted-foreground text-sm">Vaccinations, medications, etc.</p>
                  </div>
                </Button>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="absolute top-3 right-3 rounded-full">
                    <X className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>

        <button
          onClick={() => navigate(navItems[1].path)}
          className={cn(
            "flex flex-col items-center justify-center space-y-1 flex-1 h-full transition-colors",
            location.pathname.startsWith(navItems[1].path) ? "text-primary" : "text-muted-foreground"
          )}
        >
          <RightIcon className="w-6 h-6" />
          <span className="text-xs font-medium">{navItems[1].label}</span>
        </button>
      </div>
    </nav>
  );
};
