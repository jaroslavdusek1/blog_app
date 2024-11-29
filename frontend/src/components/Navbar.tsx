import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

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
              <Link to="/user/articles" className="mr-4">My articles</Link>
              <Link to="/user/articles/new" className="mr-4">Publish article</Link>
              <button className="mr-4">My Profile ▼</button>
              <button onClick={logout}>Log Out</button>
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
