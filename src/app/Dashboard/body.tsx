import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context"; // Adjust the path as needed
import ProductCard from "@/components/product-card/product-card";
import SearchBar from "@/components/search-bar/search-bar";

const Body = () => {
  const { authState } = useAuth(); // Get the auth state
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products"); // Adjust the endpoint as needed
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [authState.isAuthenticated, router]);

  if (!authState.isAuthenticated) {
    return <div>Loading...</div>; // You can show a loading state or redirect immediately
  }

  return (
    <div>
      <SearchBar/>
    
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 px-2 lg:px-10 py-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.ProductMasterId} product={product} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Body;
