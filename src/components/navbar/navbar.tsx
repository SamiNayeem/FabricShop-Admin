// body.js
import React from "react";
import Image from "next/image";

const Body = () => {
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

            {/* Navigation links */}
            <div className="flex-1 flex justify-center">
              <ul className="flex space-x-8">
                <li>
                  <a
                    href="#"
                    className="font-medium text-gray-500 hover:text-gray-900 "
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Sign in button */}
            <div>
              <a
                href="/Login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-full text-white bg-gray-900 hover:bg-gray-800"
              >
                Sign in
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Body;
