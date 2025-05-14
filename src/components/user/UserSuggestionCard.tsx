
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UserSuggestionCardProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    mutualFriends?: number;
  };
}

export const UserSuggestionCard = ({ user }: UserSuggestionCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-sm">{user.name}</h4>
          <p className="text-xs text-muted-foreground">@{user.username}</p>
          {user.mutualFriends && (
            <p className="text-xs text-muted-foreground">
              {user.mutualFriends} mutual friends
            </p>
          )}
        </div>
      </div>

      <Button
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        onClick={toggleFollow}
        className={isFollowing ? "" : "bg-social-primary hover:bg-social-secondary"}
      >
        {isFollowing ? (
          "Following"
        ) : (
          <>
            <UserPlus className="h-3 w-3 mr-1" />
            Follow
          </>
        )}
      </Button>
    </div>
  );
};
