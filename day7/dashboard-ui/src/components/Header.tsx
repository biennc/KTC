import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <IoMdSearch className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <FaBell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <FaUserCircle className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Emma Kwan</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;