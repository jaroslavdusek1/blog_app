import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = false;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex items-center">
          <Link to="/articles" className="mr-4">
            🐱
          </Link>
          <Link to="/articles" className="mr-4">Recent Articles</Link>
          <Link to="/about" className="mr-4">About</Link>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <Link to="/admin/articles" className="mr-4">My Articles</Link>
              <Link to="/admin/articles/new" className="mr-4">Create Article</Link>
              <button className="mr-4">Profile ▼</button>
              <button>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
