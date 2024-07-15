"use client"
import React from "react";
import Body from "./body";
import Menu from "@/components/menu-bar/menu-bar";

const page = () =>{
    return(
        <div className="flex">
            <Menu />
            <Body />
        </div>
    )
}

export default page