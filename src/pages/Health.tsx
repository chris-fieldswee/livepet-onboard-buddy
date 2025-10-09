import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";

const Health = () => {
  const navigate = useNavigate();

  const timelineEvents = [
    { id: 1, task: "Rabies vaccination due", dueDate: "in 2 months" },
    { id: 2, task: "Flea & Tick treatment", dueDate: "in 2 weeks" },
    { id: 3, task: "Annual check-up", dueDate: "in 1 month" },
    { id: 4, task: "Nail trim", dueDate: "in 5 days" },
  ];

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Health</h1>
          </div>
          <Button size="sm" onClick={() => navigate("/health-records")}>
            <Plus className="w-4 h-4 mr-2" />
            Manage Records
          </Button>
        </header>

        <div className="flex-1 p-6 space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Care Timeline</h2>
            <Card className="p-4">
              {timelineEvents.map((event) => (
                <div key={event.id} className="mb-4 pb-4 border-b last:mb-0 last:pb-0 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{event.task}</p>
                    <p className="text-sm text-muted-foreground">{event.dueDate}</p>
                  </div>
                </div>
              ))}
            </Card>
          </section>
        </div>

        <BottomNav />
      </div>
    </MobileContainer>
  );
};

export default Health;
