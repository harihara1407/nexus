
import { MainLayout } from "@/components/layout/MainLayout";

const Saved = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">Saved Items</h1>
          <p className="text-muted-foreground">View all your saved posts and content</p>
        </div>
        
        <div className="grid gap-6">
          <div className="border border-border rounded-xl p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-medium">No saved items yet</h2>
              <p className="text-muted-foreground max-w-md">
                When you save posts or content, they'll appear here for you to access later
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Saved;
