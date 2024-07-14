"use client"
import ProtectedRoute from "@/components/protected-route/protected-route";
import ProductCard from "@/components/product-card/product-card";
import Menu from "@/components/menu-bar/menu-bar";
import SearchBar from "@/components/search-bar/search-bar";
import React from "react";

const Body = () => {
  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-10">
      <Menu />
      {/* <SearchBar /> */}
      
      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard/>
      </div>
    </div>
  );
};



export default Body;
