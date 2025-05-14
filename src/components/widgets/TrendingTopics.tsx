
import { Sparkles } from "lucide-react";

const trendingTopics = [
  {
    id: 1,
    name: "#WebDevelopment",
    posts: "12.5K posts",
  },
  {
    id: 2,
    name: "#ReactJS",
    posts: "8.2K posts",
  },
  {
    id: 3,
    name: "#TypeScript",
    posts: "5.7K posts",
  },
  {
    id: 4,
    name: "#UXDesign",
    posts: "4.3K posts",
  },
  {
    id: 5,
    name: "#ArtificialIntelligence",
    posts: "9.1K posts",
  },
];

export const TrendingTopics = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-social-primary" />
        <h3 className="font-semibold">Trending Topics</h3>
      </div>

      <div className="space-y-3">
        {trendingTopics.map((topic) => (
          <div
            key={topic.id}
            className="hover:bg-accent/50 px-2 py-1.5 rounded-md cursor-pointer transition-colors"
          >
            <p className="font-medium text-sm">{topic.name}</p>
            <p className="text-xs text-muted-foreground">{topic.posts}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
