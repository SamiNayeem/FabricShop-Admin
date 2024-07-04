import Image from "next/image";
import React from "react";

const dbconnection = require('../config/dbconnect')

export default function Home() {

  dbconnection()
  return (
    <div className="bg-red-700 h-[30px] w-10 flex">
      <h1>Hello</h1>
      
    </div>
  );
}
