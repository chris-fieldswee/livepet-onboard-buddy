import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";

const ActivityTracker = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="flex flex-col h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center justify-between z-10">
            <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-xl font-semibold">Activity Tracker</h1>
            </div>
            <Button size="sm" onClick={() => navigate("/log-activity")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
            </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-20">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Today's Log</h2>
            <Card className="p-4">
              <p className="text-center text-muted-foreground py-8">
                No activities logged yet for today.
              </p>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Reports</h2>
            <Card className="p-4">
              <p className="text-center text-muted-foreground py-8">
                Reports will be available here.
              </p>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Dream Map</h2>
            <Card className="p-4">
              <p className="text-center text-muted-foreground py-8">
                Sleep cycle visualizations will appear here.
              </p>
            </Card>
          </section>
        </div>

        <BottomNav />
      </div>
    </MobileContainer>
  );
};

export default ActivityTracker;
