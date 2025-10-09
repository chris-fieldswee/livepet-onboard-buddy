import { useNavigate, useLocation } from "react-router-dom";
import { Home, Plus, Compass, Heart, BarChart2, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Heart, label: "Feed", path: "/feed" },
    { icon: Plus, label: "Record", path: "/record-activity" },
    { icon: Stethoscope, label: "Health", path: "/health" },
    { icon: BarChart2, label: "Tracker", path: "/tracker" },
    { icon: Compass, label: "Explore", path: "/explore" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="max-w-[428px] mx-auto flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 flex-1 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("w-6 h-6", item.label === "Record" && "w-8 h-8")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
