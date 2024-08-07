"use client";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";

export default function Menu() {
  const { authState } = useAuth();
  const router = useRouter();

  if (!authState.isAuthenticated) {
    return null; // Return null if the user is not authenticated
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="flex flex-col w-64 h-full px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l mt-2 left-0">
      <a href="#">
        <Image
          src="/images/menu.png"
          alt="FabricShop"
          width={20}
          height={20}
          className="w-25 h-30"
          style={{ height: "auto", width: "auto" }}
        />
      </a>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase">Analytics</label>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/dashboard")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z" />
              </svg>
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/sales")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
              <span className="mx-2 text-sm font-medium">Sales</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/order-history")}
            >
              <img className="h-5 w-5" src="../images/history.svg" alt="" />
              <span className="mx-2 text-sm font-medium">Order History</span>
            </a>
          </div>

          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase">Content</label>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/brand-list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <span className="mx-2 text-sm font-medium">Brands</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/color-list")}
            >
              <img className="h-5 w-5" src="../svg/color.svg" alt="" />
              <span className="mx-2 text-sm font-medium">Colors</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/size-list")}
            >
              <svg className="h-5 w-5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z"
                  fill="#000000"
                />
              </svg>
              <span className="mx-2 text-sm font-medium">Sizes</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/category-list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>
              <span className="mx-2 text-sm font-medium">Categories</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/add-product")}
            >
              <svg width="800px" className="h-5 w-5" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <path d="M14 7v1H8v6H7V8H1V7h6V1h1v6h6z" />
              </svg>
              <span className="mx-2 text-sm font-medium">Add Product</span>
            </a>
          </div>

          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase">Customization</label>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/user-list2")}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z"
                  fill="#0D0D0D"
                />
              </svg>
              <span className="mx-2 text-sm font-medium">Admin List</span>
            </a>

            <a
              className="flex items-center px-3 py-2 text-gray-600 transition duration-300 ease-in-out transform rounded-lg hover:bg-gray-100"
              onClick={() => handleNavigation("/profile")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="mx-2 text-sm font-medium">Profile Setting</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
