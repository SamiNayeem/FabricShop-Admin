"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../../app/context/auth-context';

const Navbar = () => {
  const { authState, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e:any) => {
    setSearchQuery(e.target.value);
    // You can perform search-related actions here if needed
  };

  return (
    <div className="w-full shadow-md">
      <div className="mx-auto max-w-7xl">
        <nav className="bg-white">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#">
                <Image
                  src="/images/Logo/png/logo-no-background.png"
                  alt="FabricShop"
                  width={100}
                  height={40}
                  className="w-25 h-10"
                />
              </a>
            </div>

            {/* Navigation links or Search bar */}
            {authState.isAuthenticated ? (
              // Search bar
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search Products.........."
                  className="w-3/4 mx-40 px-4 py-2 rounded-md border-2 focus:border-gray-500 focus:ring focus:ring-gray-500 focus:ring-opacity-50"
                />
              </div>
            ) : (
              // Navigation links
              <div className="flex-1 flex justify-center">
                <ul className="flex space-x-8">
                  <li>
                    <a href="#" className="font-medium text-gray-500 hover:text-gray-900">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="font-medium text-gray-500 hover:text-gray-900">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="font-medium text-gray-500 hover:text-gray-900">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {/* Sign in button or username */}
            <div className="flex items-center space-x-4">
              {authState.isAuthenticated ? (
                <>
                  <span className="inline-flex items-center px-4 py-2 text-base font-medium text-gray-900">
                    {authState.user?.username}
                    
                  </span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-full text-white bg-gray-900 hover:bg-gray-800"
                >
                  Sign in
                </a>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
