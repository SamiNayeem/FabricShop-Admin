import ProductCard from "@/components/product-card/product-card";
import Menu from "@/components/menu-bar/menu-bar";
import React from "react";

export default function Body(){
    return(
        <div>
            <Menu/>
            <ProductCard/>
        </div>
        
    )
}