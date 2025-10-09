import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";

const Training = () => {
  const navigate = useNavigate();

  const trainingPath = {
    name: "Puppy Path",
    progress: 25,
    modules: [
      { id: "socialization", title: "Socialization", completed: true },
      { id: "leash-training", title: "Leash Training", completed: false },
      { id: "advanced-tricks", title: "Advanced Tricks", completed: false },
    ],
  };

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Training</h1>
        </header>

        <div className="flex-1 p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{trainingPath.name}</h2>
            <p className="text-muted-foreground">Your pet's personalized learning curriculum.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Overall Progress</span>
              <span>{trainingPath.progress}%</span>
            </div>
            <Progress value={trainingPath.progress} />
          </div>

          <div className="space-y-3">
            {trainingPath.modules.map((module) => (
              <Card
                key={module.id}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/training/${module.id}`)}
              >
                <h3 className="font-semibold">{module.title}</h3>
                {module.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
              </Card>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileContainer>
  );
};

export default Training;
