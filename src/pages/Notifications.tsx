
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, UserPlus, Star, Award } from "lucide-react";
import { useState } from "react";

const NOTIFICATIONS = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Emma Watson",
      username: "emma_w",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    content: "liked your post",
    time: "2h ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "James Smith",
      username: "jsmith",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    content: "commented on your post: \"Great photo! Where was this taken?\"",
    time: "5h ago",
    read: false,
  },
  {
    id: "3",
    type: "friend",
    user: {
      name: "Olivia Parker",
      username: "olivia_p",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    content: "accepted your friend request",
    time: "1d ago",
    read: true,
  },
  {
    id: "4",
    type: "mention",
    user: {
      name: "Robert Chen",
      username: "robchen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    content: "mentioned you in a comment",
    time: "2d ago",
    read: true,
  },
  {
    id: "5",
    type: "system",
    content: "Your post reached 100 likes!",
    time: "3d ago",
    read: true,
  },
];

const NotificationItem = ({ notification, onMarkAsRead }: { notification: any, onMarkAsRead: (id: string) => void }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "friend":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "mention":
        return <Star className="h-4 w-4 text-amber-500" />;
      case "system":
        return <Award className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 rounded-lg border border-border mb-3 ${notification.read ? "bg-card" : "bg-accent"}`}>
      <div className="flex gap-3">
        {notification.user ? (
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={notification.user.avatar}
              alt={notification.user.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-social-light flex items-center justify-center">
            {getIcon(notification.type)}
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              {notification.user && (
                <span className="font-medium">{notification.user.name} </span>
              )}
              <span className="text-foreground">{notification.content}</span>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
          </div>
          
          {!notification.read && (
            <div className="mt-2 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={() => onMarkAsRead(notification.id)}
              >
                Mark as read
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadNotifications.length > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              All
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread {unreadNotifications.length > 0 && `(${unreadNotifications.length})`}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onMarkAsRead={handleMarkAsRead} 
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="unread">
            <div>
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onMarkAsRead={handleMarkAsRead} 
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No unread notifications</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Notifications;
