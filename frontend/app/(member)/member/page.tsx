import React from 'react';
import InputForm from '@/components/InputForm';

const page = () => {
  return (
    <section className="flex-center paddings mx-auto w-full flex-col max-w-screen-2xl">
      <section className="nav-padding flex flex-col">
        <h1 className="font-lexend font-extrabold text-gradient_purple-blue lg:text-[98px] md:text-[76px] max-xs:text-[25px] text-center">
          Join The Circuit Dao
        </h1>
        <InputForm />
      </section>
    </section>
  );
};

export default page;
