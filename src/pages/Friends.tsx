
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FRIENDS = [
  {
    id: "1",
    name: "Emma Watson",
    username: "emma_w",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 5,
  },
  {
    id: "2",
    name: "James Smith",
    username: "jsmith",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 2,
  },
  {
    id: "3",
    name: "Olivia Parker",
    username: "olivia_p",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 8,
  },
  {
    id: "4",
    name: "Robert Chen",
    username: "robchen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 3,
  },
  {
    id: "5",
    name: "Sofia Rodriguez",
    username: "sofia_r",
    avatar: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 7,
  },
  {
    id: "6",
    name: "David Park",
    username: "dpark",
    avatar: "https://images.unsplash.com/photo-1605857840732-188f2f08cb31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 4,
  },
];

const SUGGESTIONS = [
  {
    id: "7",
    name: "Laura Miller",
    username: "lmiller",
    avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 2,
  },
  {
    id: "8",
    name: "Michael Thompson",
    username: "mike_t",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 5,
  },
  {
    id: "9",
    name: "Sophia Wang",
    username: "sophiaw",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 1,
  },
];

const FriendCard = ({ friend, isSuggestion = false }: { friend: any, isSuggestion?: boolean }) => {
  return (
    <div className="bg-card rounded-lg p-4 flex items-center justify-between border border-border hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{friend.name}</h3>
          <p className="text-sm text-muted-foreground">@{friend.username}</p>
          {friend.mutualFriends > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {friend.mutualFriends} mutual friends
            </p>
          )}
        </div>
      </div>
      
      {isSuggestion ? (
        <Button className="bg-social-primary hover:bg-social-secondary">
          <UserPlus className="h-4 w-4 mr-1" />
          Add Friend
        </Button>
      ) : (
        <Button variant="outline">Message</Button>
      )}
    </div>
  );
};

const Friends = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Friends</h1>
        
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search friends..." className="pl-9" />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Friends</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FRIENDS.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUGGESTIONS.map((friend) => (
                <FriendCard key={friend.id} friend={friend} isSuggestion={true} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="requests">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No pending friend requests</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Friends;
