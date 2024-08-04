import React from "react";
import Chart from "@/components/chart/page";


const Body = () =>{

    return(
    <div className="w-3/4">
        <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mt-10">Sales History</h1>
          </div>
        <Chart/>
    </div>
        
    )
}
export default Body;