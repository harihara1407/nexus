
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="w-24 h-24 rounded-full bg-social-light flex items-center justify-center mb-6">
        <span className="text-5xl font-bold text-social-primary">404</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you were looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="bg-social-primary hover:bg-social-secondary">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
