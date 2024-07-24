"use client"
import Body from "./body";
import Menu from "@/components/menu-bar/menu-bar";

const Page = () =>{
    return(
        <div className="flex">
            <Menu/>
            <Body />
        </div>
    )
}

export default Page