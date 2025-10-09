import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CompletePetProfile = () => {
  const navigate = useNavigate();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  
  const [formData, setFormData] = useState({
    name: "Max",
    species: "dog",
    breed: "",
    gender: "",
    weight: "",
    color: "",
    microchipId: "",
    spayedNeutered: "",
    activityLevel: "",
    dietType: "",
    medicalConditions: "",
    allergies: "",
    currentMedications: "",
    vetName: "",
    vetPhone: "",
    vetAddress: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pet profile updated successfully!");
    navigate("/");
  };

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Complete Pet Profile</h1>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-8">
          {/* Basic Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed">Breed</Label>
              <Input
                id="breed"
                placeholder="e.g., Golden Retriever"
                value={formData.breed}
                onChange={(e) => handleInputChange("breed", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-3">
              <Label>Gender</Label>
              <RadioGroup value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <div className="flex items-center space-x-3 border rounded-lg p-3">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="flex-1 cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-3">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="flex-1 cursor-pointer">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color/Markings</Label>
              <Input
                id="color"
                placeholder="e.g., Golden with white chest"
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
              />
            </div>
          </section>

          {/* Physical Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Physical Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 65"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="microchipId">Microchip ID</Label>
              <Input
                id="microchipId"
                placeholder="Enter microchip number"
                value={formData.microchipId}
                onChange={(e) => handleInputChange("microchipId", e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>Spayed/Neutered</Label>
              <RadioGroup value={formData.spayedNeutered} onValueChange={(value) => handleInputChange("spayedNeutered", value)}>
                <div className="flex items-center space-x-3 border rounded-lg p-3">
                  <RadioGroupItem value="yes" id="spayed-yes" />
                  <Label htmlFor="spayed-yes" className="flex-1 cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-3">
                  <RadioGroupItem value="no" id="spayed-no" />
                  <Label htmlFor="spayed-no" className="flex-1 cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>
          </section>

          {/* Lifestyle */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Lifestyle</h2>
            
            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="very-high">Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietType">Diet Type</Label>
              <Input
                id="dietType"
                placeholder="e.g., Grain-free, Raw, Kibble"
                value={formData.dietType}
                onChange={(e) => handleInputChange("dietType", e.target.value)}
              />
            </div>
          </section>

          {/* Health Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Health Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                placeholder="List any chronic conditions or health issues"
                value={formData.medicalConditions}
                onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                placeholder="List any known allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Textarea
                id="currentMedications"
                placeholder="List current medications and dosages"
                value={formData.currentMedications}
                onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                rows={3}
              />
            </div>
          </section>

          {/* Veterinarian Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Veterinarian Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="vetName">Vet Name</Label>
              <Input
                id="vetName"
                placeholder="Dr. Smith"
                value={formData.vetName}
                onChange={(e) => handleInputChange("vetName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vetPhone">Vet Phone</Label>
              <Input
                id="vetPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.vetPhone}
                onChange={(e) => handleInputChange("vetPhone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vetAddress">Vet Address</Label>
              <Textarea
                id="vetAddress"
                placeholder="Clinic address"
                value={formData.vetAddress}
                onChange={(e) => handleInputChange("vetAddress", e.target.value)}
                rows={2}
              />
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Emergency Contact</h2>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Contact Name</Label>
              <Input
                id="emergencyContactName"
                placeholder="Full name"
                value={formData.emergencyContactName}
                onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
              <Input
                id="emergencyContactPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.emergencyContactPhone}
                onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
              />
            </div>
          </section>

          <Button type="submit" className="w-full h-12 text-base font-medium">
            Save Profile
          </Button>
        </form>
      </div>
    </MobileContainer>
  );
};

export default CompletePetProfile;
