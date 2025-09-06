import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Package, 
  ShoppingCart, 
  Heart,
  Edit,
  Mail,
  Calendar,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  username: string;
  email: string;
  fullName: string;
  bio: string;
  location: string;
  joinDate: string;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile>({
    username: 'EcoShopper',
    email: 'user@example.com',
    fullName: 'Alex Thompson',
    bio: 'Passionate about sustainable living and finding great preloved items!',
    location: 'San Francisco, CA',
    joinDate: '2024-01-01'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Items Listed', value: '12', icon: Package },
    { label: 'Items Sold', value: '8', icon: ShoppingCart },
    { label: 'Favorites', value: '24', icon: Heart },
    { label: 'Reviews', value: '15', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Badge variant="secondary" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Member since {new Date(profile.joinDate).getFullYear()}
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{profile.fullName}</h3>
                      <p className="text-muted-foreground">@{profile.username}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Profile Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={isEditing ? tempProfile.username : profile.username}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, username: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={isEditing ? tempProfile.fullName : profile.fullName}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, fullName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="email"
                          value={profile.email}
                          disabled
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={isEditing ? tempProfile.bio : profile.bio}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        placeholder="Tell others about yourself..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="location"
                          value={isEditing ? tempProfile.location : profile.location}
                          onChange={(e) => setTempProfile(prev => ({ ...prev, location: e.target.value }))}
                          disabled={!isEditing}
                          className="pl-10"
                          placeholder="City, State"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="joinDate">Member Since</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="joinDate"
                          value={new Date(profile.joinDate).toLocaleDateString()}
                          disabled
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Package className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">Listed "Vintage Denim Jacket"</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <ShoppingCart className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">Sold "iPhone 12 Pro"</p>
                        <p className="text-sm text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Heart className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">Added item to favorites</p>
                        <p className="text-sm text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Email notifications for new messages</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Email notifications for sold items</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Marketing emails</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Privacy</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Show my profile to other users</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Allow direct messages</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="pt-4">
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      This action cannot be undone.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}