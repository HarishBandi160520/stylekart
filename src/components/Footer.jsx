import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="bg-gray-800 py-4 text-center text-sm hover:underline cursor-pointer">
        Back to top
      </div>

      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h3 className="font-bold mb-2">Get to Know Us</h3>
          <ul className="space-y-1">
            <li>About StyleKart</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>StyleKart Science</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Connect with Us</h3>
          <ul className="space-y-1">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Make Money with Us</h3>
          <ul className="space-y-1">
            <li>Sell on StyleKart</li>
            <li>Become a Partner</li>
            <li>Advertise Your Products</li>
            <li>Join as Affiliate</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Let Us Help You</h3>
          <ul className="space-y-1">
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>100% Purchase Protection</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row justify-between items-center px-4 text-sm text-gray-400">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="logo" className="h-6" />
        </div>
        <div className="flex space-x-4">
          <button className="border px-2 py-1 rounded bg-gray-800">🌐 English</button>
          <button className="border px-2 py-1 rounded bg-gray-800">🇮🇳 India</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
