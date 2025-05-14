
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col w-full bg-transparent space-y-1 p-0">
                <TabsTrigger 
                  value="profile" 
                  className="justify-start w-full"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="justify-start w-full"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="justify-start w-full"
                >
                  Appearance
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="justify-start w-full"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="justify-start w-full"
                >
                  Privacy & Safety
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 w-full">
              <TabsContent value="profile" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Update your profile information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Alex Johnson" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="alexj" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        defaultValue="Web Developer | UI/UX Designer | Photography Enthusiast"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="San Francisco, CA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" defaultValue="alexjohnson.dev" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="bg-social-primary hover:bg-social-secondary ml-auto"
                      onClick={handleSaveProfile} 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Manage your account settings and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="alex@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="mr-2">Deactivate Account</Button>
                    <Button className="bg-social-primary hover:bg-social-secondary ml-auto">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how SocialApp looks on your device.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Theme</Label>
                        <p className="text-sm text-muted-foreground">
                          Select a theme for your interface.
                        </p>
                      </div>
                      <ThemeToggle />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="density">Interface Density</Label>
                      <Select defaultValue="comfortable">
                        <SelectTrigger>
                          <SelectValue placeholder="Select density" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="comfortable">Comfortable</SelectItem>
                            <SelectItem value="compact">Compact</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-social-primary hover:bg-social-secondary ml-auto">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Configure how you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Push Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notify-posts">Posts from friends</Label>
                          <Switch id="notify-posts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notify-comments">Comments</Label>
                          <Switch id="notify-comments" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notify-mentions">Mentions</Label>
                          <Switch id="notify-mentions" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notify-follows">New followers</Label>
                          <Switch id="notify-follows" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-summary">Weekly summary</Label>
                          <Switch id="email-summary" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-mentions">Important mentions</Label>
                          <Switch id="email-mentions" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-social-primary hover:bg-social-secondary ml-auto">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Safety</CardTitle>
                    <CardDescription>
                      Manage your privacy settings and security options.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Account Privacy</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="private-account">Private account</Label>
                          <Switch id="private-account" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="tagging">
                            Allow tagging by others
                          </Label>
                          <Switch id="tagging" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Security</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="two-factor">Two-factor authentication</Label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch id="two-factor" />
                        </div>
                      </div>
                      <Button variant="outline">View login activity</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-social-primary hover:bg-social-secondary ml-auto">
                      Save Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
