import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <h2 className="mb-6 text-2xl">Page Not Found</h2>
      <p className="mb-8">
        The page you are looking for doesnt exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary rounded px-4 py-2">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
