import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/MobileContainer";
import { PawPrint } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen p-6">
        <div className="flex-1 flex flex-col justify-center items-center space-y-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div
                className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                <PawPrint className="w-16 h-16 text-primary-foreground" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight">Livepet</h1>
              <p className="text-lg text-muted-foreground max-w-sm mx-auto">
                Track your pet's health, wellness, and happiness all in one place
              </p>
            </div>
          </div>

          <div className="w-full space-y-4">
            <Button
              onClick={() => navigate("/signup")}
              className="w-full h-14 text-base font-medium"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="w-full h-14 text-base font-medium"
            >
              Log In
            </Button>
          </div>
        </div>

        <div className="pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Index;
