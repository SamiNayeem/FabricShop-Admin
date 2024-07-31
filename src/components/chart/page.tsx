"use client";

import ChartOne from "./chart1";
// import ChartTwo from "./chart2";
import dynamic from "next/dynamic";
import React from "react";

const Chart: React.FC = () => {
  return (
    <>
      

      <div className="grid  gap-4 md:gap-6 2xl:gap-7.5 w-full mx-20 my-20">
        <ChartOne />
        
      </div>
    </>
  );
};

export default Chart;
