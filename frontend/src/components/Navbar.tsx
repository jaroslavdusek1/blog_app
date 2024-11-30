import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        {/* Left side - Logo and links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/about"
            className="text-3xl font-bold text-blue-300 hover:text-white transition duration-300 transform hover:scale-105"
          >
            🐱 Blog App
          </Link>
          <Link
            to="/articles"
            className="text-lg text-gray-300 hover:text-white transition duration-300 transform hover:scale-105"
          >
            Recent Articles
          </Link>
          {/* <Link
            to="/about"
            className="text-lg text-gray-300 hover:text-white transition duration-300 transform hover:scale-105"
          >
            About
          </Link> */}
        </div>

        {/* Right side - Auth-related links */}
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/user/articles"
                className="text-lg text-gray-300 hover:text-white transition duration-300 transform hover:scale-105"
              >
                My Articles
              </Link>
              <Link
                to="/user/articles/new"
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
              >
                Publish Article
              </Link>
              <div className="relative group">
                <button className="text-lg text-gray-300 hover:text-white transition duration-300 transform hover:scale-105">
                  My Profile ▼
                </button>
                {/* Dropdown menu */}
                <div className="absolute hidden group-hover:block bg-gray-800 text-sm mt-2 rounded shadow-md">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
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
                className="text-lg text-gray-300 hover:text-white transition duration-300 transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
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
