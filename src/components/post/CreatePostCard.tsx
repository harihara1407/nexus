
import { useState } from "react";
import { Camera, Image, Link, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export const CreatePostCard = () => {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const handlePost = () => {
    if (!content.trim()) {
      toast({
        title: "Can't create empty post",
        description: "Please write something to share with your friends.",
        variant: "destructive",
      });
      return;
    }

    setIsPosting(true);
    
    // Simulate posting
    setTimeout(() => {
      toast({
        title: "Post created!",
        description: "Your post has been shared successfully.",
      });
      setContent("");
      setIsPosting(false);
    }, 1000);
  };

  return (
    <div className="post-card mb-6">
      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none border-none focus-visible:ring-0 p-0 placeholder:text-muted-foreground text-foreground"
            rows={3}
          />
          
          <Separator className="my-4" />
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Image className="h-4 w-4 mr-1" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Camera className="h-4 w-4 mr-1" />
                Video
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Link className="h-4 w-4 mr-1" />
                Link
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Smile className="h-4 w-4 mr-1" />
                Feeling
              </Button>
            </div>
            
            <Button 
              onClick={handlePost}
              disabled={isPosting || !content.trim()}
              className="bg-social-primary hover:bg-social-secondary text-white"
            >
              {isPosting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
