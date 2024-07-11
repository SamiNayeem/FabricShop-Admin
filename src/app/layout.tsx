// src/app/layout.tsx
import React from 'react';
import { AuthProvider } from '@/app/context/auth-context';
import Navbar from '../components/navbar/navbar';
import Footer from '@/components/Footer/footer';
import './globals.css';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className=''>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
