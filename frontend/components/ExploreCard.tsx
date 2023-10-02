import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  id: number;
  title: string;
  address: string;
  description: string;
  userTier: any;
  votes: number;
}

const ExploreCard = ({
  id,
  title,
  address,
  description,
  userTier,
  votes,
}: Props) => {
  return (
    <section className="mt-5 py-2 px-5 ">
      <div className="flex flex-col items-center p-5 rounded-[12px] shadow-md bg-black-300 w-[272Px] h-fit ">
        <div className="flex flex-col py-2">
          <h1 className=" font-lexend text-[15px] font-extrabold text-white-800 capitalize">
            {title}
          </h1>
          <p className="text-white-800 font-Azeret text-[13px] font-semibold">
            {address}
          </p>
        </div>

        <div className="flex-center items-center  mt-5  bg-grey-200 w-[200px] h-fit rounded-[9px]">
          <p className="text-center font-Azeret font-semibold text-[11px] capitalize">
            {description}
          </p>
        </div>

        <div className="flex-between gap-[90px] mt-[60px] flex-row ">
          <p
            className={cn(
              userTier == 'gold'
                ? 'text-[#998C4A]'
                : userTier == 'silver'
                ? 'text-[#D1E8E2]'
                : 'text-[#664616]',
              'font-lexend text-[13px]  capitalize'
            )}
          >
            {userTier}
          </p>
          <div className="flex flex-row gap-2">
            <p className=" font-lexend text-[13px] text-green-600 capitalize">
              votes:{' '}
            </p>
            <p className="font-lexend text-[13px] text-green-600 ">{votes}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCard;
