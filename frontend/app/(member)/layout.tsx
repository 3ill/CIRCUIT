import React from 'react';
import Navbar from '@/components/HomeNav';
import Footer from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
