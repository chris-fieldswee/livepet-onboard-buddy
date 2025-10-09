import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileContainer } from "@/components/MobileContainer";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Password reset link sent to your email!");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen p-6">
        <div className="pt-4">
          <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Forgot Password?</h1>
            <p className="text-muted-foreground">Enter your email and we'll send you a reset link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-medium">
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
    </MobileContainer>
  );
};

export default ForgotPassword;
