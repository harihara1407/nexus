
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PostCardProps {
  post: {
    id: string;
    user: {
      name: string;
      username: string;
      avatar: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    shares: number;
    createdAt: string;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <article className="post-card mb-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{post.user.name}</h3>
          <p className="text-xs text-muted-foreground">
            @{post.user.username} · {post.createdAt}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.image && (
        <div className="rounded-lg overflow-hidden mb-4">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="flex justify-between items-center pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground gap-1 hover:text-social-accent"
          onClick={handleLike}
        >
          <Heart 
            className={`h-4 w-4 ${
              liked ? "fill-social-accent text-social-accent" : ""
            }`}
          />
          <span>{likeCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground gap-1"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground gap-1"
        >
          <Repeat className="h-4 w-4" />
          <span>{post.shares}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
};
