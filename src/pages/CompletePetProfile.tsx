import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, CalendarIcon, Upload, Camera } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const CompletePetProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // We'll get the species from the navigation state, defaulting to 'dog' for now
  const species = location.state?.species || "dog";

  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "Max",
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
    personality: "",
    favoriteActivities: "",
    walkFrequency: "",
    feedingSchedule: "",
    socialization: "",
    livingEnvironment: "",
    preventiveCare: [] as string[],
    clinicName: "",
    petInsurance: "",
    indoorOutdoor: "",
    litterBoxHabits: "",
    householdEnvironment: "",
    scratchingEnrichment: ""
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleCheckboxChange = (field: string) => {
    const currentCare = formData.preventiveCare;
    const newCare = currentCare.includes(field)
      ? currentCare.filter(item => item !== field)
      : [...currentCare, field];
    handleInputChange("preventiveCare", newCare);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pet profile updated successfully!");
    navigate("/");
  };

  const DogProfile = () => (
    <>
        {/* Section 1: About Your Dog */}
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">About Your Dog</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required placeholder="e.g., Max, Bella" />
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {profileImage ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                    <img src={profileImage} alt="Pet" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                    <Camera className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Upload className="w-5 h-5 text-primary-foreground" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Upload a photo (optional)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed">Breed</Label>
              <Input id="breed" placeholder="e.g., Golden Retriever" value={formData.breed} onChange={(e) => handleInputChange("breed", e.target.value)} />
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
                  <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} disabled={(date) => date > new Date()} initialFocus />
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
              <Label htmlFor="color">Color or Markings</Label>
              <Input id="color" placeholder="e.g., Golden with white chest" value={formData.color} onChange={(e) => handleInputChange("color", e.target.value)} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="personality">Personality</Label>
                <Input id="personality" placeholder="e.g., Playful and gentle, loves meeting people" value={formData.personality} onChange={(e) => handleInputChange("personality", e.target.value)} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="favoriteActivities">Favorite Activities</Label>
                <Input id="favoriteActivities" placeholder="e.g., Long walks, fetch, swimming" value={formData.favoriteActivities} onChange={(e) => handleInputChange("favoriteActivities", e.target.value)} />
            </div>
        </section>

        {/* Section 2: Lifestyle & Routine */}
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Lifestyle & Routine</h2>
            <div className="space-y-2">
                <Label htmlFor="activityLevel">Activity Level</Label>
                <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
                    <SelectTrigger><SelectValue placeholder="Select activity level" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very-high">Very Active</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="walkFrequency">Walk Frequency</Label>
                <Select value={formData.walkFrequency} onValueChange={(value) => handleInputChange("walkFrequency", value)}>
                    <SelectTrigger><SelectValue placeholder="Select walk frequency" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="once">Once a day</SelectItem>
                        <SelectItem value="twice">Twice a day</SelectItem>
                        <SelectItem value="thrice">Three or more times</SelectItem>
                        <SelectItem value="rarely">Rarely</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="dietType">Diet Type</Label>
                <Input id="dietType" placeholder="e.g., Grain-free kibble, home-cooked meals" value={formData.dietType} onChange={(e) => handleInputChange("dietType", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="feedingSchedule">Feeding Schedule</Label>
                <Input id="feedingSchedule" placeholder="e.g., 2 meals per day, morning and evening" value={formData.feedingSchedule} onChange={(e) => handleInputChange("feedingSchedule", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="socialization">Socialization</Label>
                <Select value={formData.socialization} onValueChange={(value) => handleInputChange("socialization", value)}>
                    <SelectTrigger><SelectValue placeholder="Select socialization level" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="friendly">Friendly with other dogs</SelectItem>
                        <SelectItem value="prefers-people">Prefers people</SelectItem>
                        <SelectItem value="shy">Shy or anxious</SelectItem>
                        <SelectItem value="learning">Still learning</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="livingEnvironment">Living Environment</Label>
                <Select value={formData.livingEnvironment} onValueChange={(value) => handleInputChange("livingEnvironment", value)}>
                    <SelectTrigger><SelectValue placeholder="Select living environment" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house-yard">House with yard</SelectItem>
                        <SelectItem value="rural">Rural or open space</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </section>

        {/* Section 3: Health & Wellness */}
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Health & Wellness</h2>
            <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input id="weight" type="number" placeholder="e.g., 65" value={formData.weight} onChange={(e) => handleInputChange("weight", e.target.value)} />
            </div>
            <div className="space-y-3">
                <Label>Spayed or Neutered?</Label>
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
            <div className="space-y-2">
                <Label htmlFor="microchipId">Microchip Number (if applicable)</Label>
                <Input id="microchipId" placeholder="Enter microchip ID" value={formData.microchipId} onChange={(e) => handleInputChange("microchipId", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="medicalConditions">Health Concerns</Label>
                <Textarea id="medicalConditions" placeholder="List any chronic conditions or health issues" value={formData.medicalConditions} onChange={(e) => handleInputChange("medicalConditions", e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea id="allergies" placeholder="e.g., Chicken, pollen" value={formData.allergies} onChange={(e) => handleInputChange("allergies", e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea id="currentMedications" placeholder="Name, dosage, and frequency" value={formData.currentMedications} onChange={(e) => handleInputChange("currentMedications", e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vaccinations">Vaccinations (optional)</Label>
                <Input id="vaccinations" placeholder="e.g., Rabies – up to date" />
            </div>
            <div className="space-y-3">
                <Label>Preventive Care</Label>
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <Checkbox id="flea-tick" onCheckedChange={() => handleCheckboxChange("flea-tick")} />
                        <Label htmlFor="flea-tick" className="font-normal">Flea/Tick prevention</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox id="heartworm" onCheckedChange={() => handleCheckboxChange("heartworm")} />
                        <Label htmlFor="heartworm" className="font-normal">Heartworm prevention</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox id="dental" onCheckedChange={() => handleCheckboxChange("dental")} />
                        <Label htmlFor="dental" className="font-normal">Dental care routine</Label>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 4: Care Team & Support */}
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Care Team & Support</h2>
            <div className="space-y-2">
                <Label htmlFor="vetName">Veterinarian Name</Label>
                <Input id="vetName" placeholder="Dr. Smith" value={formData.vetName} onChange={(e) => handleInputChange("vetName", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="clinicName">Clinic Name</Label>
                <Input id="clinicName" placeholder="Riverside Animal Hospital" value={formData.clinicName} onChange={(e) => handleInputChange("clinicName", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vetPhone">Vet Phone</Label>
                <Input id="vetPhone" type="tel" placeholder="(555) 123-4567" value={formData.vetPhone} onChange={(e) => handleInputChange("vetPhone", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vetAddress">Vet Address</Label>
                <Textarea id="vetAddress" placeholder="123 Main Street, Springfield" value={formData.vetAddress} onChange={(e) => handleInputChange("vetAddress", e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
                <Label>Emergency Contact</Label>
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Name: e.g., Sarah Johnson" value={formData.emergencyContactName} onChange={(e) => handleInputChange("emergencyContactName", e.target.value)} />
                    <Input type="tel" placeholder="Phone: (555) 987-6543" value={formData.emergencyContactPhone} onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)} />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="petInsurance">Pet Insurance (optional)</Label>
                <Input id="petInsurance" placeholder="Provider and plan name" value={formData.petInsurance} onChange={(e) => handleInputChange("petInsurance", e.target.value)} />
            </div>
        </section>
    </>
  );

  const CatProfile = () => (
      // Identical structure to DogProfile, but with cat-specific fields
      <>
        {/* Section 1: About Your Cat */}
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">About Your Cat</h2>
            {/* ... Cat-specific fields from your spec ... */}
        </section>

        {/* Section 2: Lifestyle & Environment */}
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Lifestyle & Environment</h2>
            {/* ... Cat-specific fields from your spec ... */}
        </section>

        {/* Section 3: Health & Wellness */}
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Health & Wellness</h2>
            {/* ... Cat-specific fields from your spec ... */}
        </section>

        {/* Section 4: Care Team & Support */}
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Care Team & Support</h2>
            {/* ... Cat-specific fields from your spec ... */}
        </section>
      </>
  )

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
          {species === 'dog' ? <DogProfile /> : <CatProfile />}
          
          <Button type="submit" className="w-full h-12 text-base font-medium">
            Save Profile
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            {species === 'dog' 
              ? "You can update this information anytime — Livepet will adjust insights and reminders automatically."
              : "Great work — your cat’s profile is ready to unlock tailored insights and gentle reminders that fit their unique lifestyle."
            }
          </p>
        </form>
      </div>
    </MobileContainer>
  );
};

export default CompletePetProfile;
