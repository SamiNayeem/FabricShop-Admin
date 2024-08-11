"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../../app/context/auth-context';
import Marquee from 'react-fast-marquee';

const Navbar = () => {
  const { authState, logout } = useAuth();
  
  console.log(authState.user?.image)

  

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
                  priority
                />
              </a>
            </div>

            {/* Navigation links or Search bar */}
            {authState.isAuthenticated ? (
              // Marquee
              <div className="flex-1 max-w-xl h-10 py-auto items-center py-">
                <Marquee>
                  <span className='inline-flex items-center px-4 text-base font-medium text-gray-900'>For any queries please contact: <span className=" inline-flex items-center px-4 py-2 text-base font-medium text-gray-900">fabricshop@gmail.com &nbsp;&nbsp; </span></span>
                  
        </Marquee>
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
  <img 
    src={authState.user?.image || '/path/to/default/avatar.png'} 
    alt={`${authState.user?.username}'s avatar`} 
    className="ml-2 h-8 w-8 rounded-full"
  />
</span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-full text-red-500 "
                  >
                    Logout <img src="../svg/logout.svg" alt="" height={25} width={25} className='ml-2'/>
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
