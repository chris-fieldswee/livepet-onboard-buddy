import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CompletePetProfile from "./pages/CompletePetProfile";
import UserProfile from "./pages/UserProfile";
import RecordActivity from "./pages/RecordActivity";
import CommunityFeed from "./pages/CommunityFeed";
import ExplorePage from "./pages/ExplorePage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import LogActivity from "./pages/LogActivity";
import ActivityTracker from "./pages/ActivityTracker";
import Health from "./pages/Health";
import HealthRecords from "./pages/HealthRecords";
import Nutrition from "./pages/Nutrition";
import MapPage from "./pages/Map";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/pet-profile" element={<CompletePetProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/record-activity" element={<RecordActivity />} />
          <Route path="/feed" element={<CommunityFeed />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/log-activity" element={<LogActivity />} />
          <Route path="/tracker" element={<ActivityTracker />} />
          <Route path="/health" element={<Health />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/map" element={<MapPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
