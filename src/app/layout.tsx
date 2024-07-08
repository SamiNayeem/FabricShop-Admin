import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FabricShop_Admin",
  description: "Admin Side of FabricShop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      
      <body className={inter.className}>
      <Navbar/>
        {children}
      <Footer/>
        </body>
    </html>
  );
}
