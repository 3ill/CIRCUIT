import React from 'react';

interface Props {
  title: string;
  address: string;
  description: any;
}

const EventsCard = ({ title, address, description }: Props) => {
  return (
    <section className="flex flex-col bg-black-300 lg:w-[800px] md:w-[450px] lg:h-[400px] md:h-[260px] max-xs:w-[350px] max-xs:h-[200px]  rounded-[9px] mt-7 lg:mt-9 shadow-md">
      <section className="flex flex-row justify-between px-5 lg:px-5 py-5">
        <div className="flex flex-col">
          <p className="font-Azeret text-grey-100 md:text-[11px] max-xs:text-[9px]">
            Title
          </p>
          <h1 className="font-lexend font-extrabold lg:text-[30px] md:text-[25px] max-xs:text-[13px] text-gradient_blue-purple capitalize">
            {title}
          </h1>
        </div>

        <div>
          <p className="font-Azeret text-grey-100 md:text-[11px] max-xs:text-[9px]">
            Address
          </p>
          <h1 className="font-lexend font-extrabold lg:text-[23px] md:text-[13px] max-xs:text-[11px] text-white">
            {address}
          </h1>
        </div>
      </section>

      <section className="px-5 lg:px-5 max-xs:py-[40px] md:py-[80px] lg:py-[160px] ">
        <div className="flex flex-col gap-y-2">
          <p className="font-Azeret text-grey-100 md:text-[11px] max-xs:text-[9px]">
            Description
          </p>
          <h1 className="font-lexend font-extrabold lg:text-[23px] md:text-[13px] max-xs:text-[11px] text-white capitalize">
            {description}
          </h1>
        </div>
      </section>
    </section>
  );
};

export default EventsCard;
