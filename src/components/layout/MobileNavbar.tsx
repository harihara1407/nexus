
import { Home, Users, PlusCircle, Bell, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const MobileNavbar = () => {
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
      icon: PlusCircle,
      label: "Create",
      href: "/create",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/notifications",
    },
    {
      icon: UserCircle,
      label: "Profile",
      href: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background z-30 md:hidden">
      <div className="flex justify-between items-center p-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="flex flex-col items-center p-2 flex-1"
          >
            <item.icon className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs mt-1 text-muted-foreground">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
