import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ActivityType = "food" | "water" | "potty" | "sleep" | null;

const LogActivity = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>(null);

  const activities = [
    { id: "food", icon: "🍔", label: "Food", description: "Log your pet's meals" },
    { id: "water", icon: "💧", label: "Water", description: "Track water refills" },
    { id: "potty", icon: "🚽", label: "Potty", description: "Log pee and poo" },
    { id: "sleep", icon: "😴", label: "Sleep", description: "Track sleep sessions" },
  ];

  const handleSave = () => {
    toast.success("Activity logged successfully!");
    navigate("/tracker");
  };

  const renderForm = () => {
    switch (selectedActivity) {
      case "food":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="foodType">Food Type</Label>
              <Input id="foodType" placeholder="e.g., Kibble, Wet Food" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" placeholder="e.g., 1 cup" />
            </div>
          </div>
        );
      case "water":
        return <p className="text-muted-foreground">Logged a water bowl refill.</p>;
      case "potty":
        return (
          <div className="space-y-4">
            <RadioGroup>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="pee" id="pee" />
                <Label htmlFor="pee">Pee</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="poo" id="poo" />
                <Label htmlFor="poo">Poo</Label>
              </div>
            </RadioGroup>
            <div className="space-y-2">
              <Label htmlFor="consistency">Notes on Consistency (Optional)</Label>
              <Input id="consistency" placeholder="e.g., Normal" />
            </div>
          </div>
        );
      case "sleep":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!selectedActivity) {
    return (
      <MobileContainer>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Log Activity</h1>
          </header>

          <div className="flex-1 p-6 space-y-4 overflow-y-auto pb-20">
            <h2 className="text-lg font-semibold mb-4">What do you want to log?</h2>
            {activities.map((activity) => (
              <Card
                key={activity.id}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => setSelectedActivity(activity.id as ActivityType)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{activity.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{activity.label}</h3>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
          <Button variant="ghost" size="icon" onClick={() => setSelectedActivity(null)} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">
            Log {activities.find((a) => a.id === selectedActivity)?.label}
          </h1>
        </header>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <Card className="p-6 space-y-4">{renderForm()}</Card>
          <Button onClick={handleSave} className="w-full h-12 text-base font-medium">
            Save
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};

export default LogActivity;
