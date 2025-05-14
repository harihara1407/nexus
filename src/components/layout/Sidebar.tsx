
import { Home, Users, Bell, Bookmark, UserCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Users,
    label: "Friends",
    href: "/friends",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/notifications",
  },
  {
    icon: Bookmark,
    label: "Saved",
    href: "/saved",
  },
  {
    icon: UserCircle,
    label: "Profile",
    href: "/profile",
  },
];

export const Sidebar = () => {
  const isMobile = useIsMobile();

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-sidebar border-r border-border flex-shrink-0">
      <div className="h-full flex flex-col p-4">
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-social-primary flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Nexus</h1>
          </Link>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-accent transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          
          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <div className="w-10 h-10 rounded-full bg-social-light flex-shrink-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">@alexj</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
