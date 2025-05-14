
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/post/PostCard";
import { Edit, Image, MapPin, Calendar, Link } from "lucide-react";

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
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    content: "Beautiful sunset at the beach today! 🌅",
    image:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    likes: 152,
    comments: 18,
    shares: 5,
    createdAt: "5h ago",
  },
];

const USER_PHOTOS = [
  "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1581456495146-65a71b2062bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
];

const USER = {
  name: "Alex Johnson",
  username: "alexj",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  coverPhoto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  bio: "Web Developer | UI/UX Designer | Photography Enthusiast",
  location: "San Francisco, CA",
  website: "alexjohnson.dev",
  joinedDate: "Joined September 2020",
  following: 278,
  followers: 562,
  posts: 47,
};

const Profile = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        {/* Cover Photo */}
        <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-16">
          <img
            src={USER.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <Button
            size="sm"
            variant="secondary"
            className="absolute bottom-4 right-4"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit Cover
          </Button>
          
          {/* Profile Picture */}
          <div className="absolute -bottom-12 left-4 md:left-8 border-4 border-background rounded-full w-24 h-24 md:w-32 md:h-32 overflow-hidden">
            <img
              src={USER.avatar}
              alt={USER.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">{USER.name}</h1>
            <p className="text-muted-foreground mb-3">@{USER.username}</p>
            <p className="text-foreground mb-3">{USER.bio}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {USER.location}
              </div>
              <div className="flex items-center">
                <Link className="h-4 w-4 mr-1" />
                {USER.website}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {USER.joinedDate}
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button className="bg-social-primary hover:bg-social-secondary">
              Edit Profile
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex gap-8 mb-6 text-sm">
          <div>
            <span className="font-bold">{USER.posts}</span> Posts
          </div>
          <div>
            <span className="font-bold">{USER.followers}</span> Followers
          </div>
          <div>
            <span className="font-bold">{USER.following}</span> Following
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            {MOCK_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
          
          <TabsContent value="photos">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {USER_PHOTOS.map((photo, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden h-36 md:h-48 hover-scale"
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <div className="space-y-4">
                <p>
                  Web developer with 5+ years of experience building modern, responsive web applications. Passionate about UI/UX design and creating seamless user experiences.
                </p>
                <div className="flex items-center">
                  <span className="font-medium w-24">Work:</span>
                  <span>Senior Developer at TechCorp</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">Education:</span>
                  <span>Computer Science, Stanford University</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">Location:</span>
                  <span>San Francisco, California</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">Joined:</span>
                  <span>September 2020</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
