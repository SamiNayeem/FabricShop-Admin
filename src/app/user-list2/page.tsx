"use client"
import Menu from "@/components/menu-bar/menu-bar";
import Body from "./body";

const Page = () =>{
    return(
        <div className="flex">
            <Menu/>
            <Body/>
        </div>
    )
}

export default Page;