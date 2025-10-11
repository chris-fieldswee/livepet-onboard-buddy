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
import { Progress } from "@/components/ui/progress";

// Mock data for dropdowns
const dogBreeds = ["Golden Retriever", "Labrador", "German Shepherd", "French Bulldog", "Beagle", "Poodle", "Mixed Breed"];
const catBreeds = ["Domestic Shorthair", "Siamese", "Persian", "Maine Coon", "Ragdoll", "Bengal", "Mixed Breed"];
const colors = ["Black", "White", "Brown", "Golden", "Grey", "Tricolor", "Tabby", "Spotted"];
const personalities = ["Playful", "Affectionate", "Calm", "Curious", "Shy", "Energetic", "Independent"];
const dogActivities = ["Fetch", "Long walks", "Swimming", "Agility courses", "Cuddling"];
const catActivities = ["Window watching", "Chasing laser pointers", "Cuddling", "Climbing", "Puzzle toys"];
const dietTypes = ["Kibble", "Wet Food", "Raw Food", "Home-cooked", "Mixed (Wet/Dry)"];
const feedingSchedules = ["Two meals per day", "Three meals per day", "Free feeding (always available)"];


const CompletePetProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const species = location.state?.species || "dog";
  const [step, setStep] = useState(1);

  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    // Shared fields
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
    feedingSchedule: "",
    preventiveCare: [] as string[],
    clinicName: "",
    petInsurance: "",
    // Dog specific
    walkFrequency: "",
    socialization: "",
    livingEnvironment: "",
    // Cat specific
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
  
  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const progress = 25 + (step - 1) * 25;

  const renderFormContent = () => {
    const isDog = species === 'dog';
    
    switch(step) {
      case 1: // About
        return (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">{isDog ? "About Your Dog" : "About Your Cat"}</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required placeholder={isDog ? "e.g., Max, Bella" : "e.g., Luna, Oliver"} />
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
                  <input id="photo-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Upload a photo (optional)</p>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Select value={formData.breed} onValueChange={(value) => handleInputChange("breed", value)}>
                    <SelectTrigger><SelectValue placeholder={isDog ? "e.g., Golden Retriever" : "e.g., Domestic Shorthair"} /></SelectTrigger>
                    <SelectContent>
                        {(isDog ? dogBreeds : catBreeds).map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateOfBirth && "text-muted-foreground")}>
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
                <div className="flex items-center space-x-3 border rounded-lg p-3"><RadioGroupItem value="male" id="male" /><Label htmlFor="male" className="flex-1 cursor-pointer">Male</Label></div>
                <div className="flex items-center space-x-3 border rounded-lg p-3"><RadioGroupItem value="female" id="female" /><Label htmlFor="female" className="flex-1 cursor-pointer">Female</Label></div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Color or Markings</Label>
              <Select value={formData.color} onValueChange={(value) => handleInputChange("color", value)}>
                <SelectTrigger><SelectValue placeholder={isDog ? "e.g., Golden with white chest" : "e.g., Grey tabby with white paws"} /></SelectTrigger>
                <SelectContent>{colors.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="personality">Personality</Label>
                <Select value={formData.personality} onValueChange={(value) => handleInputChange("personality", value)}>
                  <SelectTrigger><SelectValue placeholder={isDog ? "e.g., Playful and gentle..." : "e.g., Curious and affectionate..."} /></SelectTrigger>
                  <SelectContent>{personalities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="favoriteActivities">Favorite Activities</Label>
                <Select value={formData.favoriteActivities} onValueChange={(value) => handleInputChange("favoriteActivities", value)}>
                  <SelectTrigger><SelectValue placeholder={isDog ? "e.g., Long walks, fetch, swimming" : "e.g., Window watching, chasing toys"} /></SelectTrigger>
                  <SelectContent>{(isDog ? dogActivities : catActivities).map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                </Select>
            </div>
          </section>
        )
      case 2: // Lifestyle
        return (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">{isDog ? "Lifestyle & Routine" : "Lifestyle & Environment"}</h2>
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
            {isDog ? (
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
            ) : (
              <div className="space-y-3">
                  <Label>Indoor or Outdoor</Label>
                  <RadioGroup value={formData.indoorOutdoor} onValueChange={(value) => handleInputChange("indoorOutdoor", value)}>
                      <div className="flex items-center space-x-3 border rounded-lg p-3"><RadioGroupItem value="indoor" id="indoor" /><Label htmlFor="indoor" className="flex-1 cursor-pointer">Indoor only</Label></div>
                      <div className="flex items-center space-x-3 border rounded-lg p-3"><RadioGroupItem value="outdoor" id="outdoor" /><Label htmlFor="outdoor" className="flex-1 cursor-pointer">Outdoor</Label></div>
                      <div className="flex items-center space-x-3 border rounded-lg p-3"><RadioGroupItem value="both" id="both" /><Label htmlFor="both" className="flex-1 cursor-pointer">Both</Label></div>
                  </RadioGroup>
              </div>
            )}
            <div className="space-y-2">
                <Label htmlFor="dietType">Diet Type</Label>
                <Select value={formData.dietType} onValueChange={(value) => handleInputChange("dietType", value)}>
                  <SelectTrigger><SelectValue placeholder={isDog ? "e.g., Grain-free kibble..." : "e.g., Grain-free wet food..."} /></SelectTrigger>
                  <SelectContent>{dietTypes.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="feedingSchedule">Feeding Schedule</Label>
                <Select value={formData.feedingSchedule} onValueChange={(value) => handleInputChange("feedingSchedule", value)}>
                  <SelectTrigger><SelectValue placeholder={isDog ? "e.g., 2 meals per day..." : "e.g., Free feeding..."} /></SelectTrigger>
                  <SelectContent>{feedingSchedules.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            {isDog ? (
              <>
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
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="litterBoxHabits">Litter Box Habits (optional)</Label>
                  <Input id="litterBoxHabits" placeholder="e.g., Uses clumping litter, no issues" value={formData.litterBoxHabits} onChange={(e) => handleInputChange("litterBoxHabits", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="householdEnvironment">Household Environment</Label>
                  <Select value={formData.householdEnvironment} onValueChange={(value) => handleInputChange("householdEnvironment", value)}>
                      <SelectTrigger><SelectValue placeholder="Select household environment" /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="alone">Lives alone</SelectItem>
                          <SelectItem value="with-cats">With other cats</SelectItem>
                          <SelectItem value="with-dogs">With dogs</SelectItem>
                          <SelectItem value="with-kids">With kids</SelectItem>
                          <SelectItem value="multiple-pets">Multiple pets</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scratchingEnrichment">Scratching or Enrichment</Label>
                  <Input id="scratchingEnrichment" placeholder="e.g., Uses scratching post, enjoys puzzle toys" value={formData.scratchingEnrichment} onChange={(e) => handleInputChange("scratchingEnrichment", e.target.value)} />
                </div>
              </>
            )}
          </section>
        )
      case 3: // Health & Wellness
        return (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Health & Wellness</h2>
            <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input id="weight" type="number" placeholder={isDog ? "e.g., 65" : "e.g., 10"} value={formData.weight} onChange={(e) => handleInputChange("weight", e.target.value)} />
            </div>
            <div className="space-y-3">
                <Label>Spayed or Neutered?</Label>
                <RadioGroup value={formData.spayedNeutered} onValueChange={(value) => handleInputChange("spayedNeutered", value)}>
                  <div className="flex items-center space-x-3 border rounded-lg p-3"><RadioGroupItem value="yes" id="spayed-yes" /><Label htmlFor="spayed-yes" className="flex-1 cursor-pointer">Yes</Label></div>
                  <div className="flex items-center space-x-3 border rounded-lg p-3"><RadioGroupItem value="no" id="spayed-no" /><Label htmlFor="spayed-no" className="flex-1 cursor-pointer">No</Label></div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
                <Label htmlFor="microchipId">Microchip Number (if applicable)</Label>
                <Input id="microchipId" placeholder="Enter microchip ID" value={formData.microchipId} onChange={(e) => handleInputChange("microchipId", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="medicalConditions">Health Concerns</Label>
                <Textarea id="medicalConditions" placeholder="List any ongoing or chronic conditions" value={formData.medicalConditions} onChange={(e) => handleInputChange("medicalConditions", e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea id="allergies" placeholder="e.g., Chicken, dust" value={formData.allergies} onChange={(e) => handleInputChange("allergies", e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea id="currentMedications" placeholder="Name, dosage, and frequency" value={formData.currentMedications} onChange={(e) => handleInputChange("currentMedications", e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vaccinations">Vaccinations (optional)</Label>
                <Input id="vaccinations" placeholder={isDog ? "e.g., Rabies – up to date" : "e.g., FVRCP, Rabies – up to date"} />
            </div>
            <div className="space-y-3">
                <Label>Preventive Care</Label>
                <div className="space-y-2">
                    <div className="flex items-center space-x-3"><Checkbox id="flea-tick" onCheckedChange={() => handleCheckboxChange("flea-tick")} /><Label htmlFor="flea-tick" className="font-normal">Flea/Tick prevention</Label></div>
                    {isDog ? (
                      <div className="flex items-center space-x-3"><Checkbox id="heartworm" onCheckedChange={() => handleCheckboxChange("heartworm")} /><Label htmlFor="heartworm" className="font-normal">Heartworm prevention</Label></div>
                    ) : (
                      <div className="flex items-center space-x-3"><Checkbox id="deworming" onCheckedChange={() => handleCheckboxChange("deworming")} /><Label htmlFor="deworming" className="font-normal">Deworming</Label></div>
                    )}
                    <div className="flex items-center space-x-3"><Checkbox id="dental" onCheckedChange={() => handleCheckboxChange("dental")} /><Label htmlFor="dental" className="font-normal">Dental care routine</Label></div>
                </div>
            </div>
        </section>
        )
      case 4: // Care Team
        return (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Care Team & Support</h2>
            <div className="space-y-2"><Label htmlFor="vetName">Veterinarian Name</Label><Input id="vetName" placeholder="Dr. Smith" value={formData.vetName} onChange={(e) => handleInputChange("vetName", e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="clinicName">Clinic Name</Label><Input id="clinicName" placeholder={isDog ? "Riverside Animal Hospital" : "City Cat Clinic"} value={formData.clinicName} onChange={(e) => handleInputChange("clinicName", e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="vetPhone">Vet Phone</Label><Input id="vetPhone" type="tel" placeholder="(555) 123-4567" value={formData.vetPhone} onChange={(e) => handleInputChange("vetPhone", e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="vetAddress">Vet Address</Label><Textarea id="vetAddress" placeholder={isDog ? "123 Main Street, Springfield" : "123 Maple Avenue, Springfield"} value={formData.vetAddress} onChange={(e) => handleInputChange("vetAddress", e.target.value)} rows={2} /></div>
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
        )
      default: return null;
    }
  }

  return (
    <MobileContainer>
      <div className="flex flex-col h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Complete Pet Profile</h1>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Step {step} of 4
            </div>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium">Profile Completion</Label>
                <span className="text-sm font-medium text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            {renderFormContent()}
          </div>
          
          <div className="p-4 border-t bg-background">
            <div className="flex gap-4">
                {step > 1 && (
                  <Button type="button" variant="outline" className="w-full h-12 text-base font-medium" onClick={handleBack}>
                      Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button type="button" className="w-full h-12 text-base font-medium" onClick={handleNext}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" className="w-full h-12 text-base font-medium">
                    Save
                  </Button>
                )}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {species === 'dog' 
                ? "You can update this information anytime — Livepet will adjust insights and reminders automatically."
                : "Great work — your cat’s profile is ready to unlock tailored insights and gentle reminders that fit their unique lifestyle."
              }
            </p>
          </div>
        </form>
      </div>
    </MobileContainer>
  );
};

export default CompletePetProfile;
