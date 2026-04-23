import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="
      flex justify-between items-center 
      px-6 py-4 
      bg-white dark:bg-gray-900 
      shadow-md
    ">
      
      {/* Logo */}
      <h1 className="text-xl font-bold">
        🎬 MovieReview
      </h1>

      {/* Links */}
      <div className="flex gap-6 text-sm font-medium bg-gray-900 text-white">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/search" className="hover:text-blue-500">
          Search
        </Link>
      </div>
    </nav>
  );
}