
import { UsersRound } from "lucide-react";
import { UserSuggestionCard } from "../user/UserSuggestionCard";

const suggestedFriends = [
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
];

export const FriendSuggestions = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <UsersRound className="h-5 w-5 text-social-primary" />
        <h3 className="font-semibold">People You May Know</h3>
      </div>

      <div className="space-y-2">
        {suggestedFriends.map((user) => (
          <UserSuggestionCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
