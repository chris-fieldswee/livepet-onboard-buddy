import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileContainer } from "@/components/MobileContainer";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState<"dog" | "cat" | "">("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && petName && species) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      toast.success("Basic profile created!");
    }
  };

  const handleGoalChange = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const progressValue = step === 1 ? 10 : 25;

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen p-6">
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <Label className="text-sm text-muted-foreground">Pet Profile Progress</Label>
            <Progress value={progressValue} className="mt-2" />
          </div>

          <div className="text-center space-y-4">
            {step === 1 && (
              <>
                <h1 className="text-3xl font-bold tracking-tight">Add Your Pet</h1>
                <p className="text-muted-foreground">
                  Let's create a profile for your furry friend
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <h1 className="text-3xl font-bold tracking-tight">
                  What are your goals?
                </h1>
                <p className="text-muted-foreground">
                  This helps us personalize your app experience.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <h1 className="text-3xl font-bold tracking-tight">
                  Great Start!
                </h1>
                <p className="text-muted-foreground">
                  Your basic profile is ready. Add more details to unlock personalized insights.
                </p>
              </>
            )}
          </div>

          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6 mt-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  {profileImage ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                      <img
                        src={profileImage}
                        alt="Pet"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                      <Camera className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-primary-foreground" />
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload a photo of your pet
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="petName">Pet's Name*</Label>
                <Input
                  id="petName"
                  type="text"
                  placeholder="e.g., Max, Luna"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Species*</Label>
                <RadioGroup
                  value={species}
                  onValueChange={(value) =>
                    setSpecies(value as "dog" | "cat")
                  }
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="dog" id="dog" />
                    <Label htmlFor="dog" className="flex-1 cursor-pointer">
                      Dog
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="cat" id="cat" />
                    <Label htmlFor="cat" className="flex-1 cursor-pointer">
                      Cat
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-medium">
                Continue
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 mt-8">
              {[
                "Track daily activities (walks, food, etc.)",
                "Manage health (appointments, medications, etc.)",
                "Find fun things to do (events, challenges, etc.)",
                "Get training and behavior advice",
              ].map((goal) => (
                <div
                  key={goal}
                  className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleGoalChange(goal)}
                >
                  <Checkbox
                    id={goal}
                    checked={goals.includes(goal)}
                    onCheckedChange={() => handleGoalChange(goal)}
                  />
                  <Label htmlFor={goal} className="flex-1 cursor-pointer">
                    {goal}
                  </Label>
                </div>
              ))}
              <Button
                onClick={handleNextStep}
                className="w-full h-12 text-base font-medium"
              >
                Finish
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 mt-8">
              <Button
                onClick={() => navigate("/pet-profile")}
                className="w-full h-12 text-base font-medium"
              >
                Complete Pet's Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full h-12 text-base font-medium"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </MobileContainer>
  );
};

export default Onboarding;
