
import { MainLayout } from "@/components/layout/MainLayout";
import { CreatePostCard } from "@/components/post/CreatePostCard";
import { PostCard } from "@/components/post/PostCard";
import { TrendingTopics } from "@/components/widgets/TrendingTopics";
import { FriendSuggestions } from "@/components/widgets/FriendSuggestions";

const MOCK_POSTS = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    content:
      "Just finished working on a new project with React and TypeScript! The developer experience is amazing. What tech stack are you all using these days?",
    likes: 24,
    comments: 5,
    shares: 2,
    createdAt: "2h ago",
  },
  {
    id: "2",
    user: {
      name: "Sam Wilson",
      username: "samwilson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    content: "Beautiful sunset at the beach today! 🌅",
    image:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    likes: 152,
    comments: 18,
    shares: 5,
    createdAt: "5h ago",
  },
  {
    id: "3",
    user: {
      name: "Emma Watson",
      username: "emma_w",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    content:
      "Just finished reading 'Atomic Habits' by James Clear. Highly recommend it to anyone looking to build better habits and break bad ones. What are you reading these days?",
    likes: 87,
    comments: 32,
    shares: 12,
    createdAt: "1d ago",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <CreatePostCard />
          
          <div>
            {MOCK_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        
        <div className="space-y-6 hidden md:block">
          <TrendingTopics />
          <FriendSuggestions />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
