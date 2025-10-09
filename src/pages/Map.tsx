import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MapPage = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Local Spots</h1>
        </header>

        <div className="flex-1 p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search for parks, vets, etc." className="pl-10" />
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline">Walking Routes</Button>
            <Button variant="outline">Specialists</Button>
            <Button variant="outline">Services</Button>
          </div>

          <Card className="h-64 flex items-center justify-center bg-muted">
            <p className="text-muted-foreground">Map view coming soon</p>
          </Card>

          <div>
            <h3 className="font-semibold mb-2">Popular Nearby</h3>
            <div className="space-y-2">
              <Card className="p-3">
                <h4 className="font-medium">Riverside Park Loop</h4>
                <p className="text-sm text-muted-foreground">3.2 km walking route</p>
                <div className="flex items-center text-sm mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" /> 4.8 (120 reviews)
                </div>
              </Card>
              <Card className="p-3">
                <h4 className="font-medium">Dr. Emily Carter (Vet Cardiologist)</h4>
                <p className="text-sm text-muted-foreground">Veterinary Specialist</p>
                <div className="flex items-center text-sm mt-1">
                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" /> 4.9 (89 reviews)
                </div>
              </Card>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    </MobileContainer>
  );
};

export default MapPage;
