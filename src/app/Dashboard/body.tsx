import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "@/components/product-card/product-card";
import Menu from "@/components/menu-bar/menu-bar";

const Body = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Adjust the endpoint as needed
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <Menu/>
    
      <div className="flex-1 px-2 lg:px-10 py-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {products.map((product) => (
            <ProductCard key={product.ProductMasterId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
