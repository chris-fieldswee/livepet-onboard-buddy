import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const Nutrition = () => {
    const navigate = useNavigate();
    return (
        <MobileContainer>
            <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-xl font-semibold">Nutrition</h1>
                </header>

                <div className="flex-1 p-6 space-y-4">
                    <Card className="p-4">
                        <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
                        <p className="text-sm text-muted-foreground">
                            Complete your pet's profile to receive personalized nutrition recommendations.
                        </p>
                    </Card>
                </div>
            </div>
        </MobileContainer>
    );
};

export default Nutrition;
