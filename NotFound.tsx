
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-4xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-xl text-gray-600 mt-4 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button size="lg">Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
