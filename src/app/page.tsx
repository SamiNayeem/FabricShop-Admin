import Image from "next/image";
import React from "react";

const dbconnection = require('../config/dbconnect')

export default function Home() {

  dbconnection()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Hello</h1>
      
    </div>
  );
}
