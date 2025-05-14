
import { Bell, Menu, MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface TopbarProps {
  toggleSidebar: () => void;
}

export const Topbar = ({ toggleSidebar }: TopbarProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        <div className={`${isMobile ? 'w-full max-w-[200px]' : 'w-full max-w-xs'}`}>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-secondary border-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-social-primary rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          
          {!isMobile && (
            <div className="w-8 h-8 rounded-full bg-social-light overflow-hidden ml-2">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
