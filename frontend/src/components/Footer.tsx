import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>© 2024 Blog App. All rights reserved.</p>
      <p>
        <a href="/privacy" className="text-blue-400 hover:underline">
          Privacy Policy
        </a>
        {' | '}
        <a href="/terms" className="text-blue-400 hover:underline">
          Terms of Service
        </a>
      </p>
    </footer>
  );
};

export default Footer;
