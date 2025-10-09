import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const HealthRecords = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
          <Button variant="ghost" size="icon" onClick={() => navigate("/health")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Health Records</h1>
        </header>

        <div className="flex-1 p-6 space-y-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Vaccinations</h3>
            <p className="text-sm text-muted-foreground">No vaccination records yet.</p>
            <Button size="sm" className="mt-2">Add Vaccination</Button>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Medications</h3>
            <p className="text-sm text-muted-foreground">No medication records yet.</p>
            <Button size="sm" className="mt-2">Add Medication</Button>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Allergies</h3>
            <p className="text-sm text-muted-foreground">No allergies recorded.</p>
            <Button size="sm" className="mt-2">Add Allergy</Button>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Log Book</h3>
            <p className="text-sm text-muted-foreground">No log book entries yet.</p>
            <Button size="sm" className="mt-2">Add Note</Button>
          </Card>
        </div>
      </div>
    </MobileContainer>
  );
};

export default HealthRecords;
