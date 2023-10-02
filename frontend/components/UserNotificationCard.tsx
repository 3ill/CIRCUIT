import React from 'react';
import Image from 'next/image';

const UserNotificationCard = () => {
  return (
    <section className="flex flex-col">
      <div className="flex-center py-5 flex-col  bg-black-300 w-[200px] h-[150px] rounded-[12px] shadow-md">
        <div className="flex flex-row justify-between gap-5 items-center">
          <p className="text-grey-100 font-Azeret px-1 font-semibold text-[15px]">
            Proposals
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]">
          {' '}
          300
        </p>
      </div>

      <div className="flex-center py-5 flex-col mt-5  bg-black-300 w-[200px] h-[150px] rounded-[12px] shadow-md">
        <div className="flex flex-row justify-between gap-[55px] items-center">
          <p className="text-grey-100 font-Azeret font-semibold px-1 text-[15px]">
            Votes
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]">
          {' '}
          3000
        </p>
      </div>
    </section>
  );
};

export default UserNotificationCard;
