import React from 'react';
import Image from 'next/image';

interface Props {
  memberCount: number;
  adminCount: number;
  totalCount: number;
  pendingProposal: number;
  activeProposal: number;
  totalProposal: number;
}

const NotificationCard = () => {
  return (
    <section className="flex-col">
      <div className="flex-center py-5 flex-col  bg-black-400 w-[200px] h-[150px] rounded-[12px] shadow-md">
        <div className="flex flex-row justify-between gap-5 items-center">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px]">
            Council Members
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]">
          {' '}
          5
        </p>
      </div>

      <div className="flex-center flex-col mt-[20px] py-5 bg-black-400 w-[200px] h-[150px] rounded-[12px] shadow-md">
        <div className="flex flex-row justify-between gap-[93px] px-3 mt-5 ">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px]">
            Admins
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]">
          {' '}
          3
        </p>
      </div>

      <div className="flex-center py-5 flex-col mt-[20px] bg-black-400  w-[200px] h-[150px] rounded-[12px] shadow-md">
        <div className="flex flex-row justify-between gap-5 items-center">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px]">
            Total Members
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]">
          {' '}
          30
        </p>
      </div>

      <div className="flex-center py-5 flex-col mt-[176px] bg-black-300 w-[200px] h-[150px] rounded-[12px] shadow-md">
        <div className="flex flex-row justify-between gap-3 px-5 items-center">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px]">
            Pending Proposals
          </p>
          <Image src="/ellipse-1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]">
          {' '}
          300
        </p>
      </div>

      <div className="flex-center py-5 flex-col mt-[33px]  bg-black-300 w-[200px] h-[150px] rounded-[12px] shadow-md">
        <div className="flex flex-row justify-between gap-3 px-5 items-center">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px]">
            Active Proposals
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]">
          {' '}
          300
        </p>
      </div>

      <div className="flex-center py-5 flex-col mt-[33px]  bg-black-300 w-[200px] h-[150px] rounded-[12px] shadow-md">
        <div className="flex flex-row justify-between gap-3 px-5 items-center">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px]">
            Total Proposals
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]">
          {' '}
          500
        </p>
      </div>
    </section>
  );
};

export default NotificationCard;
