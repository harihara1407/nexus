
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavbar } from "./MobileNavbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 w-full">
        {(isSidebarOpen || !isMobile) && <Sidebar />}
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>
      </div>
      {isMobile && <MobileNavbar />}
    </div>
  );
};
