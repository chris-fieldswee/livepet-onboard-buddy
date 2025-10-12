import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Dog, Cat, Settings, LogOut, Plus, Shield, Bone, Stethoscope, Map, Compass, Bell, MessageSquare, X } from "lucide-react";
import { usePet } from "@/context/PetContext";

const petSpecificLinks = [
    { href: "/pet-profile", label: "Profile", icon: Shield },
    { href: "/health", label: "Health", icon: Stethoscope },
    { href: "/nutrition", label: "Nutrition", icon: Bone },
];

export const TopNav = () => {
    const navigate = useNavigate();
    const { pets, activePet, setActivePet } = usePet();

    const handlePetChange = (petId: string) => {
        const newActivePet = pets.find(p => p.id === petId);
        if (newActivePet) {
            setActivePet(newActivePet);
        }
    };

    return (
        <Sheet modal={false}>
            <header className="sticky top-0 z-10 bg-background p-4 border-b flex items-center justify-between">
                <SheetTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <Avatar>
                            <AvatarImage src={activePet.image} alt={activePet.name} />
                            <AvatarFallback>{activePet.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-xl font-bold">{activePet.name}</h1>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                </SheetTrigger>

                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/map')}><Map className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/explore')}><Compass className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full"><Bell className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full"><MessageSquare className="w-5 h-5" /></Button>
                </div>
            </header>
            <SheetContent side="left" className="p-0 flex flex-col">
                <div className="p-4 pt-10">
                    <Select onValueChange={handlePetChange} defaultValue={activePet.id}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a pet" />
                        </SelectTrigger>
                        <SelectContent>
                            {pets.map(pet => (
                                <SelectItem key={pet.id} value={pet.id}>
                                    <div className="flex items-center gap-2">
                                        {pet.species === "Dog" ? <Dog className="w-4 h-4" /> : <Cat className="w-4 h-4" />}
                                        {pet.name}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Separator />
                <nav className="flex-1 p-4 space-y-2">
                    {petSpecificLinks.map(link => (
                         <Button key={link.href} variant="ghost" className="w-full justify-start" onClick={() => navigate(link.href)}>
                            <link.icon className="mr-2 w-4 h-4" />
                            {link.label}
                        </Button>
                    ))}
                    <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/onboarding')}>
                        <Plus className="mr-2 w-4 h-4" />
                        Add another pet
                    </Button>
                </nav>
                <Separator />
                <div className="p-4 mt-auto">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/profile')}>
                        <Settings className="mr-2 w-4 h-4" />
                        Settings
                    </Button>
                     <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => navigate('/login')}>
                        <LogOut className="mr-2 w-4 h-4" />
                        Log Out
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
