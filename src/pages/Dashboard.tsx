import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PawPrint, Calendar, Heart, Activity, ChevronRight } from "lucide-react";
import { usePet } from "@/context/PetContext";
import { TopNav } from "@/components/TopNav";

const Dashboard = () => {
  const navigate = useNavigate();
  const { activePet } = usePet();

  // Mock data, in the future this would come from the pet context or an API
  const petProfile = {
    ...activePet,
    isComplete: false,
  };

  return (
    <MobileContainer>
      <div className="flex flex-col h-screen">
        <TopNav />

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

          {/* Quick Actions */}
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate("/health")}>
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold">Appointments</h4>
                    <p className="text-sm text-muted-foreground">Schedule vet visits</p>
                  </div>
                </Card>

                <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate("/health-records")}>
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold">Health Log</h4>
                    <p className="text-sm text-muted-foreground">Track wellness</p>
                  </div>
                </Card>

                <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate("/tracker")}>
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold">Activities</h4>
                    <p className="text-sm text-muted-foreground">Log daily walks</p>
                  </div>
                </Card>

                <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate("/health-records")}>
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
              <h3 className="text-lg font-semibold mb-4">Recent Activity for {activePet.name}</h3>
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
