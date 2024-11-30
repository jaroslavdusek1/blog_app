import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 text-center py-6">
      <p className="text-sm">
        © 2024 Blog App. All rights reserved.
      </p>
      <p className="mt-2 text-sm">
        <a
          href="/privacy"
          className="text-blue-400 hover:text-blue-500 transition duration-300"
        >
          Privacy Policy
        </a>
        {' | '}
        <a
          href="/terms"
          className="text-blue-400 hover:text-blue-500 transition duration-300"
        >
          Terms of Service
        </a>
      </p>
      <p className="mt-4 text-xs text-gray-500">
        Built with ❤️ by the JD.
      </p>
    </footer>
  );
};

export default Footer;
