import React from 'react';
import Image from 'next/image';

interface Props {
  memberCount: number;
  adminCount: number;
  totalCount: number;
  rejectedProposal: number;
  approvedProposal: number;
  totalProposal: number;
}

const NotificationCard = ({
  memberCount,
  adminCount,
  totalCount,
  totalProposal,
  approvedProposal,
  rejectedProposal,
}: Props) => {
  return (
    <section className="flex-col">
      <div className="flex-center py-5 flex-col  bg-black-400 w-[200px] h-[150px] rounded-[12px] shadow-md group hover:scale-110 transition hover:bg-black-300">
        <div className="flex flex-row justify-between gap-5 items-center">
          <p className="text-grey-100 group-hover:text-white-800 font-Azeret font-semibold text-[15px] transition">
            Council Members
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] px-5 group-hover:translate-y-2 transition">
          {' '}
          {memberCount}
        </p>
      </div>

      <div className="flex-center flex-col mt-[20px] py-5 bg-black-400 w-[200px] h-[150px] rounded-[12px] shadow-md group hover:scale-110 transition hover:bg-black-300">
        <div className="flex flex-row justify-between gap-[93px] px-3 mt-5 group-hover:text-white-800 transition ">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px]   ">
            Admins
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]group-hover:translate-y-2 transition px-5">
          {' '}
          {adminCount}
        </p>
      </div>

      <div className="flex-center py-5 flex-col mt-[20px] bg-black-400  w-[200px] h-[150px] rounded-[12px] shadow-md group hover:scale-110 transition hover:bg-black-300">
        <div className="flex flex-row justify-between gap-5 items-center">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px] group-hover:text-white-800 transition">
            Total Members
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]group-hover:translate-y-2 transition px-5">
          {' '}
          {totalCount}
        </p>
      </div>

      <div className="flex-center py-5 flex-col mt-[176px] bg-black-300 w-[200px] h-[150px] rounded-[12px] shadow-md group hover:scale-110 transition hover:bg-black-400">
        <div className="flex flex-row justify-between gap-3 px-5 items-center">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px] group-hover:text-white-800 transition">
            Rejected Proposals
          </p>
          <Image src="/ellipse-1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]group-hover:translate-y-2 transition px-5">
          {' '}
          {rejectedProposal}
        </p>
      </div>

      <div className="flex-center py-5 flex-col mt-[33px]  bg-black-300 w-[200px] h-[150px] rounded-[12px] shadow-md group hover:scale-110 transition hover:bg-black-400">
        <div className="flex flex-row justify-between gap-3 px-5 items-center">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px] group-hover:text-white-800 transition">
            Approved Proposals
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]group-hover:translate-y-2 transition px-5">
          {' '}
          {approvedProposal}
        </p>
      </div>

      <div className="flex-center py-5 flex-col mt-[33px]  bg-black-300 w-[200px] h-[150px] rounded-[12px] shadow-md group hover:scale-110 transition hover:bg-black-400">
        <div className="flex flex-row justify-between gap-3 px-5 items-center">
          <p className="text-grey-100 font-Azeret font-semibold text-[15px] group-hover:text-white-800 transition">
            Total Proposals
          </p>
          <Image src="/Ellipse 1.svg" alt="ellipse" width={20} height={20} />
        </div>
        <p className="font-Azeret text-[20px] text-white font-bold self-start mt-[15px] ml-[38px]group-hover:translate-y-2 transition px-5">
          {' '}
          {totalProposal}
        </p>
      </div>
    </section>
  );
};

export default NotificationCard;
