import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, Video, Zap, Crown } from "lucide-react";
import { toast } from "sonner";

const ExplorePage = () => {
  const events = [
    {
      id: "1",
      title: "Pet Nutrition Masterclass",
      type: "webinar",
      price: "$29",
      date: "Dec 15, 2024",
      participants: 234,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop",
      badge: "Expert",
      description: "Learn from certified veterinary nutritionists",
      isPaid: true,
    },
    {
      id: "2",
      title: "50km Walking Challenge",
      type: "challenge",
      price: "Free",
      date: "Jan 1 - Jan 31",
      participants: 1523,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
      badge: "Popular",
      description: "Walk 50km with your pet this month and win prizes!",
      isPaid: false,
    },
    {
      id: "3",
      title: "Advanced Obedience Training",
      type: "program",
      price: "$99",
      date: "Self-paced",
      participants: 567,
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop",
      badge: "Premium",
      description: "8-week guided digital training program",
      isPaid: true,
    },
    {
      id: "4",
      title: "Pet First Aid Workshop",
      type: "webinar",
      price: "$39",
      date: "Dec 20, 2024",
      participants: 189,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      badge: "Essential",
      description: "Life-saving skills every pet parent should know",
      isPaid: true,
    },
  ];

  const handleRegister = (event: typeof events[0]) => {
    if (event.isPaid) {
      toast.success(`Registration for ${event.title} coming soon!`);
    } else {
      toast.success(`You've joined ${event.title}! Good luck! 🎉`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "webinar":
        return <Video className="w-4 h-4" />;
      case "challenge":
        return <Trophy className="w-4 h-4" />;
      case "program":
        return <Zap className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen pb-20">
        <header className="sticky top-0 bg-background border-b p-4 z-10">
          <h1 className="text-2xl font-bold">Explore</h1>
          <p className="text-sm text-muted-foreground">Events, challenges, and premium content</p>
        </header>

        <div className="flex-1 p-4 space-y-6">
          {/* Featured Section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Featured Events</h2>
              <Crown className="w-5 h-5 text-yellow-500" />
            </div>
            
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={events[0].image}
                  alt={events[0].title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                  {events[0].badge}
                </Badge>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {getIcon(events[0].type)}
                  <span className="capitalize">{events[0].type}</span>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>{events[0].date}</span>
                </div>
                <h3 className="text-xl font-bold">{events[0].title}</h3>
                <p className="text-sm text-muted-foreground">{events[0].description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{events[0].participants} joined</span>
                  </div>
                  <span className="text-lg font-bold">{events[0].price}</span>
                </div>
                <Button onClick={() => handleRegister(events[0])} className="w-full">
                  Register Now
                </Button>
              </div>
            </Card>
          </section>

          {/* All Events */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">All Events & Challenges</h2>
            
            <div className="space-y-3">
              {events.slice(1).map((event) => (
                <Card key={event.id} className="overflow-hidden hover-scale">
                  <div className="flex">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className="text-xs">
                          {event.badge}
                        </Badge>
                        <span className="text-sm font-bold">{event.price}</span>
                      </div>
                      <h3 className="font-semibold line-clamp-2">{event.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        {getIcon(event.type)}
                        <span>{event.date}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleRegister(event)}
                        className="w-full"
                      >
                        {event.isPaid ? "View Details" : "Join Free"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <BottomNav />
      </div>
    </MobileContainer>
  );
};

export default ExplorePage;
