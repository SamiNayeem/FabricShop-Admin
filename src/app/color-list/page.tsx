"use client"

import Menu from "@/components/menu-bar/menu-bar"
import Body from "./body"
import Preloader from "@/components/preloader/preloader";
import { Suspense } from "react";

const page = () =>{
    return(
        <div className="flex">
            <Suspense fallback={<Preloader />}>
            <Menu />
            <Body />
            </Suspense>
        </div>
    )
};

export default page;