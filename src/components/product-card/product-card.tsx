import React from "react";

const ProductCard = () => {
    const shirtImage = "/images/shirt.jpg"; // Assuming the image path is correct
  
    const quantity = 5;
    const availabilityStatus = quantity > 0 ? "available" : "unavailable";
  
    return (
      <div className="w-full md:w-80 bg-white mb-10 mt-2 mx-auto shadow-lg">
        <div
          className="h-48 sm:h-64 w-full bg-gray-200 flex flex-col p-4 bg-cover bg-center"
          style={{ backgroundImage: `url(${shirtImage})` }}
        >
          
          <div>
            <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
              {availabilityStatus}
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col items-center">
          <p className="text-gray-400 font-light text-xs text-center">Aarong</p>
          <h1 className="text-gray-800 text-center mt-1">Full Sleeve Shirt</h1>
          <p className="text-center text-gray-800 mt-1">Tk. 500</p>
          <div className="inline-flex items-center mt-2">
            <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
              In Stock: {quantity}
            </div>
          </div>
          <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
            View and Modify
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0zm12-2a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

export default ProductCard;
