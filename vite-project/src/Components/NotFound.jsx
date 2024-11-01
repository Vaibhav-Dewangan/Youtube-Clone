import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

function NotFound() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="text-xl mt-4">Something went wrong.</p>

      {error?.status && (
        <p className="text-lg mt-2 text-gray-600">Error {error.status}</p>
      )}

      {error?.statusText && (
        <p className="text-lg mt-1 text-gray-500">{error.statusText}</p>
      )}

      <p className="mt-6 text-gray-400">
        Please check the URL or go back to the homepage.
      </p>

      <Link to="/" className="mt-4 text-blue-500 underline">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
