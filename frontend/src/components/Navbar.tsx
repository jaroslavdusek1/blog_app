import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - Logo and links */}
        <div className="flex items-center space-x-4">
          <Link to="/articles" className="text-2xl font-bold text-blue-400 hover:text-blue-500">
            🐱 Blog App
          </Link>
          <Link to="/articles" className="text-gray-300 hover:text-white transition duration-200">
            Recent Articles
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition duration-200">
            About
          </Link>
        </div>

        {/* Right side - Auth-related links */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/user/articles"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                My Articles
              </Link>
              <Link
                to="/user/articles/new"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow transition duration-200"
              >
                Publish Article
              </Link>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition duration-200">
                  My Profile ▼
                </button>
                {/* Dropdown menu */}
                <div className="absolute hidden group-hover:block bg-gray-800 text-sm mt-2 rounded shadow-md">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
