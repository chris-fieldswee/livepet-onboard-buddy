import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PawPrint, Calendar, Heart, Activity, Bell, User, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const petProfile = {
    name: "Max",
    species: "Dog",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    isComplete: false,
  };

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Livepet</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate("/profile")}>
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-20">
          {/* Complete Profile Banner */}
          {!petProfile.isComplete && (
            <div className="px-6 mt-6">
              <Card className="p-4 bg-primary text-primary-foreground">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-semibold">Complete Your Pet's Profile</h3>
                    <p className="text-sm opacity-90">Add more details to unlock all features</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0 ml-3"
                    onClick={() => navigate("/pet-profile")}
                  >
                    Complete
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Pet Profile Card */}
          <div className="p-6 space-y-6">
            <Card className="p-6 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate("/pet-profile")}>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={petProfile.image}
                    alt={petProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{petProfile.name}</h2>
                  <p className="text-muted-foreground">{petProfile.species}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold">Appointments</h4>
                    <p className="text-sm text-muted-foreground">Schedule vet visits</p>
                  </div>
                </Card>

                <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold">Health Log</h4>
                    <p className="text-sm text-muted-foreground">Track wellness</p>
                  </div>
                </Card>

                <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold">Activities</h4>
                    <p className="text-sm text-muted-foreground">Log daily walks</p>
                  </div>
                </Card>

                <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <PawPrint className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold">Records</h4>
                    <p className="text-sm text-muted-foreground">View history</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <Card className="p-4">
                <p className="text-center text-muted-foreground py-8">
                  No recent activity. Start tracking your pet's health!
                </p>
              </Card>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileContainer>
  );
};

export default Dashboard;
