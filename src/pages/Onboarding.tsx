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
          <div className="text-center text-sm text-muted-foreground mb-4">
            {step === 1 && "Step 1 of 3"}
            {step === 2 && "Step 2 of 3"}
            {step === 3 && "Step 3 of 3"}
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Pet Profile Progress</Label>
              <span className="text-sm font-medium text-muted-foreground">{progressValue}%</span>
            </div>
            <Progress value={progressValue} />
          </div>

          <div className="text-center space-y-4">
            {step === 1 && (
              <>
                <h1 className="text-3xl font-bold tracking-tight">
                  Let’s get to know your pet
                </h1>
                <p className="text-muted-foreground">
                  Start by creating a simple profile so Livepet can understand
                  your pet’s unique needs and routines.
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <h1 className="text-3xl font-bold tracking-tight">
                  What would you like Livepet to help with?
                </h1>
                <p className="text-muted-foreground">
                  Choose your goals so we can tailor tips, reminders, and
                  insights just for you and your pet.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <h1 className="text-3xl font-bold tracking-tight">
                  You’re off to a great start
                </h1>
                <p className="text-muted-foreground">
                  {petName}'s basic profile is ready. Add a few more details to
                  unlock personalized insights, health reminders, and daily care
                  suggestions.
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

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
              >
                Continue
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                You can add more details later — this just gets us started.
              </p>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 mt-8">
              {[
                {
                  title: "Track daily activities (walks, meals, playtime)",
                  description: "Keep your pet’s routine consistent and balanced.",
                },
                {
                  title: "Manage health and wellness (appointments, medications, reminders)",
                  description: "Stay organized and confident about your pet’s care.",
                },
                {
                  title: "Discover new activities (events, challenges, ideas)",
                  description: "Find fun, meaningful ways to spend time together.",
                },
                {
                  title: "Get training and behavior guidance",
                  description: "Support your pet’s growth with expert advice and gentle techniques.",
                },
              ].map((goal) => (
                <div
                  key={goal.title}
                  className="flex items-start space-x-4 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleGoalChange(goal.title)}
                >
                  <Checkbox
                    id={goal.title}
                    checked={goals.includes(goal.title)}
                    onCheckedChange={() => handleGoalChange(goal.title)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={goal.title}
                      className="font-semibold cursor-pointer"
                    >
                      {goal.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                onClick={handleNextStep}
                className="w-full h-12 text-base font-medium"
              >
                Continue
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                You can update your goals anytime — we’ll grow with you.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 mt-8">
              <Button
                onClick={() => navigate("/pet-profile")}
                className="w-full h-12 text-base font-medium"
              >
                Complete Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full h-12 text-base font-medium"
              >
                Go to Dashboard
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                You can always finish your setup later — everything you’ve done
                so far is saved.
              </p>
            </div>
          )}
        </div>
      </div>
    </MobileContainer>
  );
};

export default Onboarding;
