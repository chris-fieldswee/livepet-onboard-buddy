import { useState } from "react";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PawPrint, MessageCircle, Share2, MapPin, Clock, Route } from "lucide-react";
import { toast } from "sonner";

const CommunityFeed = () => {
  const [activities] = useState([
    {
      id: "1",
      pet: { name: "Luna", avatar: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop" },
      owner: "Sarah Johnson",
      activityType: "Walk",
      emoji: "枢",
      duration: "45 min",
      distance: "3.2 km",
      location: "Riverside Park",
      caption: "Beautiful morning walk with Luna! She loved chasing the ducks ｦ",
      photos: [
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop",
      ],
      kudos: 24,
      comments: 5,
      timestamp: "2 hours ago",
      hasLiked: false,
    },
    {
      id: "2",
      pet: { name: "Max", avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop" },
      owner: "Mike Chen",
      activityType: "Training",
      emoji: "ｦｴ",
      duration: "30 min",
      caption: "Max finally mastered 'stay'! So proud of this good boy 脂",
      photos: [
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=crop",
      ],
      kudos: 18,
      comments: 3,
      timestamp: "4 hours ago",
      hasLiked: true,
    },
    {
      id: "3",
      pet: { name: "Bella", avatar: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=100&h=100&fit=crop" },
      owner: "Emma Davis",
      activityType: "Play Session",
      emoji: "疾",
      duration: "20 min",
      caption: "Fetch session at the dog park! Bella made so many new friends today 枢",
      photos: [],
      kudos: 31,
      comments: 8,
      timestamp: "6 hours ago",
      hasLiked: false,
    },
  ]);

  const [likedActivities, setLikedActivities] = useState<Set<string>>(new Set(["2"]));

  const handleKudos = (activityId: string) => {
    setLikedActivities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
        toast.success("Kudos removed");
      } else {
        newSet.add(activityId);
        toast.success("Kudos given! 総");
      }
      return newSet;
    });
  };

  const handleComment = () => {
    toast.success("Comment feature coming soon!");
  };

  const handleShare = () => {
    toast.success("Share feature coming soon!");
  };

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background border-b p-4 z-10">
          <h1 className="text-2xl font-bold">Community Feed</h1>
        </header>

        <div className="flex-1 space-y-4 p-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden animate-fade-in">
              {/* Header */}
              <div className="p-4 flex items-center space-x-3">
                <Avatar className="w-12 h-12 border-2 border-primary">
                  <AvatarImage src={activity.pet.avatar} alt={activity.pet.name} />
                  <AvatarFallback>{activity.pet.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{activity.pet.name}</h3>
                  <p className="text-sm text-muted-foreground">{activity.owner}</p>
                </div>
                <div className="text-2xl">{activity.emoji}</div>
              </div>

              {/* Photos */}
              {activity.photos.length > 0 && (
                <div className={`grid ${activity.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-1`}>
                  {activity.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Activity ${idx + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{activity.duration}</span>
                  </div>
                  {activity.distance && (
                    <div className="flex items-center space-x-1">
                      <Route className="w-4 h-4" />
                      <span>{activity.distance}</span>
                    </div>
                  )}
                  {activity.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location}</span>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <p className="text-sm">{activity.caption}</p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleKudos(activity.id)}
                      className={likedActivities.has(activity.id) ? "text-red-500" : ""}
                    >
                      <PawPrint
                        className={`w-5 h-5 mr-1 ${likedActivities.has(activity.id) ? "fill-current" : ""}`}
                      />
                      {activity.kudos + (likedActivities.has(activity.id) && !activity.hasLiked ? 1 : 0)}
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" onClick={handleComment}>
                    <MessageCircle className="w-5 h-5 mr-1" />
                    {activity.comments}
                  </Button>

                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </Card>
          ))}
        </div>

        <BottomNav />
      </div>
    </MobileContainer>
  );
};

export default CommunityFeed;
