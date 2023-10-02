import React from 'react';
import Navbar from '@/components/HomeNav';
import Footer from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-7">
        <Sidebar />
      </div>
      {children}
      <Footer />
    </>
  );
};

export default layout;
