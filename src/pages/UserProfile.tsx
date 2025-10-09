import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Camera, Upload, UserPlus, Mail, Trash2, Award } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const UserProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("John Doe");
  const [email] = useState("john.doe@example.com");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [familyMembers, setFamilyMembers] = useState([
    { id: "1", name: "Jane Doe", email: "jane.doe@example.com", status: "active" },
    { id: "2", name: "Bob Smith", email: "bob.smith@example.com", status: "pending" },
  ]);
  const [achievements] = useState([
      { id: 1, name: "Good Boy Badge" },
      { id: 2, name: "Social Butterfly" }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handleSendInvite = () => {
    if (inviteEmail) {
      toast.success(`Invitation sent to ${inviteEmail}!`);
      setFamilyMembers([
        ...familyMembers,
        {
          id: Date.now().toString(),
          name: inviteEmail.split("@")[0],
          email: inviteEmail,
          status: "pending",
        },
      ]);
      setInviteEmail("");
    }
  };

  const handleRemoveMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
    toast.success("Family member removed");
  };

  return (
    <MobileContainer>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background border-b p-4 flex items-center space-x-3 z-10">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Profile Settings</h1>
        </header>

        <div className="flex-1 p-6 space-y-8">
          {/* Personal Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {profileImage ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                    <Camera className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Upload className="w-4 h-4 text-primary-foreground" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </section>

          <Separator />
          
          {/* Achievements Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Achievements</h2>
            <Card className="p-4">
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement) => (
                  <Badge key={achievement.id} variant="secondary" className="text-sm">
                    <Award className="w-4 h-4 mr-1" />
                    {achievement.name}
                  </Badge>
                ))}
              </div>
            </Card>
          </section>

          <Separator />

          {/* Family Members */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Family Members</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] mx-auto">
                  <DialogHeader>
                    <DialogTitle>Invite Family Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-email">Email Address</Label>
                      <Input
                        id="invite-email"
                        type="email"
                        placeholder="family@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        They'll receive an invitation to join your pet's profile
                      </p>
                    </div>
                    <Button onClick={handleSendInvite} className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Invitation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <p className="text-sm text-muted-foreground">
              Family members can view and log activities for your pets
            </p>

            <div className="space-y-3">
              {familyMembers.map((member) => (
                <Card key={member.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{member.name}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            member.status === "active"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {member.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Separator />

          {/* Account Actions */}
          <section className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                toast.success("Logged out successfully");
                navigate("/login");
              }}
            >
              Log Out
            </Button>
          </section>
        </div>
      </div>
    </MobileContainer>
  );
};

export default UserProfile;
