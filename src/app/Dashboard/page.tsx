"use client"
import React from "react";
import Body from "./body";
import Menu from "@/components/menu-bar/menu-bar";

import { useAuth } from "../context/auth-context";


export default function dashboard(){
    // const {authState} = useAuth();

    // if(!authState.isAuthenticated){
    //     return null;
    // }
    
    return(
        <div className="flex">
            <Menu/>
            <Body/>
        </div>
    )
}