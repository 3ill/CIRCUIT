'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { profileNav } from '@/constants';
import { proposals } from '@/constants';
import ProposalCard from '@/components/ProposalCard';
import UserNotificationCard from '@/components/UserNotificationCard';
import CreateProposal from '@/components/CreateProposal';
import MintToken from '@/components/MintToken';
import { getAccount } from 'wagmi/actions';

const Page = () => {
  const [active, setActive] = useState('');
  const [proposalClicked, setIsProposalClicked] = useState(false);
  const [tokenClicked, setIsTokenClicked] = useState(false);
  const [upgradeClicked, setIsUpgradeClicked] = useState(false);
  const [eventClicked, setIsEventClicked] = useState(false);
  const [assignClicked, setIsAssignClicked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const { address } = getAccount();

  console.log(address);

  const handleFilter = (link: string) => {
    setActive(link);

    if (active === 'create proposal') {
      setIsProposalClicked((prevIsProposalClicked) => !prevIsProposalClicked);
      setIsTokenClicked(false);
      setIsUpgradeClicked(false);
      setIsEventClicked(false);
      setIsAssignClicked(false);
    } else if (active === 'mint token') {
      setIsTokenClicked((prevIsTokenClicked) => !prevIsTokenClicked);
      setIsProposalClicked(false);
      setIsUpgradeClicked(false);
      setIsEventClicked(false);
      setIsAssignClicked(false);
    } else if (active === 'update tier') {
      setIsUpgradeClicked((prevIsUpgradeClicked) => !prevIsUpgradeClicked);
      setIsProposalClicked(false);
      setIsEventClicked(false);
      setIsAssignClicked(false);
      setIsTokenClicked(false);
    } else if (active === 'user events') {
      setIsEventClicked((prevIsEventClicked) => !prevIsEventClicked);
      setIsProposalClicked(false);
      setIsAssignClicked(false);
      setIsTokenClicked(false);
      setIsUpgradeClicked(false);
    }
  };

  const handleAssignClicked = () => {
    setIsAssignClicked((prevIsAssignClicked) => !prevIsAssignClicked);
    setIsProposalClicked(false);
    setIsTokenClicked(false);
    setIsUpgradeClicked(false);
    setIsEventClicked(false);
  };

  const checkIsAdmin = (isAdmin: boolean) => {
    if (isAdmin === true) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  return (
    <section className=" paddings mx-auto w-full flex-col max-w-screen-2xl">
      <section className="nav-padding flex flex-col md:px-5">
        <div className="flex absolute right-6 top-[110px] justify-end items-center">
          <div className="flex flex-col gap-1 items-center">
            <h3 className="font-lexend font-normal text-white max-xs:text-[11px] text-[15px]">
              Balance
            </h3>
            <div className="flex flex-row gap-3 items-center p-2 bg-black-200 no-focus rounded-[12px]">
              <Image src="/Wallet.png" alt="wallet" width={30} height={30} />
              <p className="font-Azeret text-white text-[15px] max-xs:text-[11px] font-semibold">
                500 SURGE
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row max-xs:gap-2 gap-3 p-3">
          <div className="w-[95px] h-[95px] rounded-full items-center p-1 bg-grey-200">
            <Image src="/profile.png" alt="profile" width={90} height={90} />
          </div>
          <div className="flex flex-col">
            <p className="font-lexend lg:text-[30px] md:text-[25px] max-xs:text-[18px] font-bold text-gradient_purple-blue ">
              3illBaby
            </p>
            <p className="font-Azeret lg:text-[25px] md:text-[20px]   max-xs:text-[16px] font-semibold text-grey-100">
              oxabccddeeg
            </p>
            <p className="font-Azeret text-[11px] font-medium text-[#998c4a] capitalize">
              gold
            </p>
          </div>
        </div>

        <div className="flex flex-row flex-center gap-3 mt-5 max-xs:mt-[55px]">
          {profileNav.map((nav: any) => (
            <div
              key={nav.name}
              onClick={() => handleFilter(nav.name)}
              className={cn(
                active === nav.name
                  ? 'frame bg-grey-200 shadow-sm'
                  : 'bg-grey-100',
                'rounded-[15px] items-center p-2 flex flex-row lg:w-[150px] gap-1'
              )}
            >
              <Image src={nav.icon} alt="icon" width={30} height={30} />
              <p
                className={cn(
                  active === nav.name
                    ? 'text-gradient_purple-blue'
                    : 'text-black-300 ',
                  'font-Azeret font-semibold text-[11px] max-xs:hidden'
                )}
              >
                {nav.name}
              </p>
            </div>
          ))}

          <button
            className={cn(
              assignClicked ? 'frame bg-grey-200 shadow-sm' : ' bg-grey-100 ',

              `rounded-[15px] items-center  p-2 lg:w-[150px] flex flex-row gap-1 ${
                isAdmin ? 'block' : 'hidden'
              }`
            )}
            onClick={handleAssignClicked}
          >
            <div className="flex-center gap-x-1 flex-row items-center">
              <Image
                src="/Law.png"
                alt="assign"
                width={30}
                height={30}
                className={cn(isAdmin ? 'block' : 'hidden')}
              />
              <p
                className={cn(
                  assignClicked
                    ? 'text-gradient_purple-blue'
                    : 'text-black-300 ',
                  'font-Azeret font-semibold text-[11px] w-full text-center max-xs:hidden'
                )}
              >
                assign council
              </p>
            </div>
          </button>
        </div>
        {proposalClicked && (
          <div className="flex-center mt-5">
            <CreateProposal />
          </div>
        )}

        {tokenClicked && (
          <div className="flex-center mt-5">
            <MintToken />
          </div>
        )}

        <div className="flex-center flex-row max-xs:flex-col mt-5">
          {!proposalClicked &&
            !tokenClicked &&
            !upgradeClicked &&
            !eventClicked &&
            !assignClicked && (
              <div>
                {proposals.map((proposal: any) => (
                  <div key={proposal.id}>
                    <ProposalCard
                      id={proposal.id}
                      title={proposal.title}
                      proposer={proposal.proposer}
                      description={proposal.description}
                      userTier={proposal.userTier}
                      amount={proposal.amount}
                      voteCount={proposal.voteCount}
                      time={proposal.time}
                      state={proposal.state}
                    />
                  </div>
                ))}
              </div>
            )}
          {!proposalClicked &&
            !tokenClicked &&
            !upgradeClicked &&
            !eventClicked &&
            !assignClicked && (
              <div className="absolute flex flex-col top-[400px] right-6 max-xs:hidden">
                <UserNotificationCard />
              </div>
            )}
        </div>
      </section>
    </section>
  );
};

export default Page;
