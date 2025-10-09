import { useNavigate, useParams } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const lessonsData = {
  "socialization": [
    { id: 1, title: "Lesson 1: Introduce to new sounds" },
    { id: 2, title: "Lesson 2: Meet a calm adult dog" },
    { id: 3, title: "Lesson 3: First car ride" },
  ],
  "leash-training": [
    { id: 1, title: "Lesson 1: Getting comfortable with the collar" },
    { id: 2, title: "Lesson 2: First walk in a quiet area" },
  ],
   "advanced-tricks": [
    { id: 1, title: "Lesson 1: Teach 'Roll Over'" },
    { id: 2, title: "Lesson 2: Teach 'Play Dead'" },
  ],
};

const moduleTitles = {
    "socialization": "Socialization",
    "leash-training": "Leash Training",
    "advanced-tricks": "Advanced Tricks"
}

const TrainingModule = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  
  const lessons = lessonsData[moduleId as keyof typeof lessonsData] || [];
  const title = moduleTitles[moduleId as keyof typeof moduleTitles] || "Training Module";


  const handleComplete = (lessonTitle: string) => {
    toast.success(`${lessonTitle} marked as complete! +10 XP`);
  };

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
          <Button variant="ghost" size="icon" onClick={() => navigate("/training")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">{title}</h1>
        </header>

        <div className="flex-1 p-6 space-y-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="p-4">
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Detailed instructions with text, images, and videos will appear here.
              </p>
              <Button size="sm" className="mt-4" onClick={() => handleComplete(lesson.title)}>
                Mark as Complete
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </MobileContainer>
  );
};

export default TrainingModule;
