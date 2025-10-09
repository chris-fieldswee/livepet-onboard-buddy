import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, MapPin, Clock, Route, Play, Pause, Check } from "lucide-react";
import { toast } from "sonner";

type ActivityType = "walk" | "play" | "training" | "rest" | null;

const RecordActivity = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState("");
  const [caption, setCaption] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState("Central Park, New York");

  const activities = [
    { id: "walk", icon: "🐕", label: "Walk", description: "Track your route with GPS" },
    { id: "play", icon: "🎾", label: "Play Session", description: "Log playtime duration" },
    { id: "training", icon: "🦴", label: "Training", description: "Track training sessions" },
    { id: "rest", icon: "🛋️", label: "Rest Day", description: "Log a rest day" },
  ];

  const handleStartStop = () => {
    if (!isTracking) {
      setIsTracking(true);
      toast.success("Activity started!");
      // Simulate timer
      const interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsTracking(false);
      toast.success("Activity paused");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 5) {
      toast.error("Maximum 5 photos allowed");
      return;
    }
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePublish = () => {
    if (!caption.trim()) {
      toast.error("Please add a caption");
      return;
    }
    toast.success("Activity published to feed!");
    navigate("/feed");
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!selectedActivity) {
    return (
      <MobileContainer>
        <div className="flex flex-col min-h-screen pb-20">
          <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Record Activity</h1>
          </header>

          <div className="flex-1 p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Choose Activity Type</h2>
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
          <BottomNav />
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen pb-20">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
          <Button variant="ghost" size="icon" onClick={() => setSelectedActivity(null)} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">
            {activities.find((a) => a.id === selectedActivity)?.label}
          </h1>
        </header>

        <div className="flex-1 p-6 space-y-6">
          {/* Tracking Section */}
          <Card className="p-6 space-y-4">
            <div className="flex justify-center">
              <div className="text-6xl font-bold">{formatDuration(duration)}</div>
            </div>

            {selectedActivity === "walk" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-1">
                    <Route className="w-4 h-4" />
                    <span className="text-sm">Distance</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="text-center"
                  />
                  <span className="text-xs text-muted-foreground">km</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Location</span>
                  </div>
                  <p className="text-sm font-medium">{location}</p>
                </div>
              </div>
            )}

            <Button
              onClick={handleStartStop}
              className="w-full h-14"
              variant={isTracking ? "outline" : "default"}
            >
              {isTracking ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause Activity
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  {duration > 0 ? "Resume" : "Start Activity"}
                </>
              )}
            </Button>

            {duration > 0 && !isTracking && (
              <Button onClick={() => {}} variant="outline" className="w-full">
                <Check className="w-5 h-5 mr-2" />
                Complete Activity
              </Button>
            )}
          </Card>

          {/* Photo Upload */}
          <div className="space-y-3">
            <Label>Add Photos (up to 5)</Label>
            <div className="grid grid-cols-5 gap-2">
              {photos.map((photo, idx) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              {photos.length < 5 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="How was your activity? Share your thoughts..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
            />
          </div>

          {/* Publish Button */}
          <Button onClick={handlePublish} className="w-full h-12 text-base font-medium">
            Publish to Feed
          </Button>
        </div>
        <BottomNav />
      </div>
    </MobileContainer>
  );
};

export default RecordActivity;
