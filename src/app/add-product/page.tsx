"use client"
import Body from "./body";
import Menu from "@/components/menu-bar/menu-bar";
import ProtectedRoute from "@/components/protected-route/protected-route";

const Page = () =>{
    return(
        <div className="flex">
            <Menu/>
            <Body/>
        </div> 
    )
};

export default Page;