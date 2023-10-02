'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Props {
  id: number;
  username: string;
  profilePicture: any;
  memberAddress: string;
  balance: number;
  userTier: string;
  proposals: number;
  votes: number;
  isAdmin: boolean;
  isCouncilMember: boolean;
}

const MemberCard = ({
  id,
  username,
  profilePicture,
  memberAddress,
  balance,
  userTier,
  proposals,
  votes,
  isAdmin,
  isCouncilMember,
}: Props) => {
  const [admin, setAdmin] = useState('');
  const [council, setCouncil] = useState('');

  const handleAdmin = (value: boolean) => {
    if (value === true) {
      setAdmin('ADMIN');
    } else {
      setAdmin('NON ADMIN');
    }
  };

  const handleCouncil = (value: boolean) => {
    if (value === true) {
      setCouncil('COUNCIL MEMBER');
    } else {
      setCouncil('MEMBER');
    }
  };

  useEffect(() => {
    handleAdmin(isAdmin);

    handleCouncil(isCouncilMember);
  }, [isAdmin, isCouncilMember]);

  return (
    <section className="flex flex-col">
      <div className="flex flex-col bg-black-400 lg:w-[800px] md:w-[450px] lg:h-[400px] md:h-[260px] max-xs:w-[350px] max-xs:h-[250px] rounded-[9px] mt-7 shadow-md ">
        <div className=" flex-between ">
          <div className="flex flex-row  gap-3 items-center p-3">
            <div className="w-[75px] h-[75px] rounded-full items-center p-1 bg-grey-200">
              <Image
                src={profilePicture}
                alt="profile"
                width={70}
                height={70}
              />
            </div>
            <div className="flex flex-col">
              <p className="font-lexend lg:text-[20px] md:text-[15px] max-xs:text-[13px] font-bold text-gradient_purple-blue ">
                {username}
              </p>
              <p className="font-Azeret lg:text-[20px] md:text-[15px]   max-xs:text-[13px] font-semibold text-grey-100">
                {memberAddress}
              </p>
              <p className="font-Azeret text-[11px font-medium text-[#998c4a] capitalize">
                {userTier}
              </p>
            </div>
          </div>

          <div className="flex flex-row  gap-3 items-center px-5 ">
            <Image src="/Wallet.png" alt="wallet" width={30} height={30} />
            <div className="gap-1 flex flex-row ">
              <p className="font-lexend text-white lg:text-[15px] md:text-[13px] max-xs:text-[11px]">
                {balance}
              </p>
              <p className="font-lexend text-white lg:text-[15px] md:text-[13px] max-xs:text-[11px]">
                SURGE
              </p>
            </div>
          </div>
        </div>

        <section className="flex-between px-5 lg:py-[200px] py-[80px]">
          <div className="flex flex-col gap-2 text-[#998C4A] font-lexend font-bold text-[15px] max-xs:text-[13px] ">
            <p>{admin}</p>
            <p>{council}</p>
          </div>

          <div className="flex flex-col gap-2 font-Azeret lg:text-[15px] text-[13px] font-semibold">
            <div className="flex flex-row gap-1 text-gradient_blue">
              <p>Proposals: </p>
              <p>{proposals}</p>
            </div>

            <div className="flex flex-row gap-1 text-[#5DA772]">
              <p>Votes: </p>
              <p>{votes}</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default MemberCard;
