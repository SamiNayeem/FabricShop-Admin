import ProtectedRoute from "@/components/protected-route/protected-route";
import ProductCard from "@/components/product-card/product-card";
import Menu from "@/components/menu-bar/menu-bar";
import React from "react";


const body = () =>{
    return(
        <div className="flex mt-2">
            <Menu/>
            <ProductCard/>
        </div>
    )
}

export default ProtectedRoute(body)