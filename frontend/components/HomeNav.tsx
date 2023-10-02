'use client';

import React from 'react';
import { MobileSideBar } from './Mobile-sidebar';
import { Button } from './ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  wagmiConfig,
  WagmiConfig,
  RainbowKitProvider,
  chains,
} from './WalletConnect';

import Link from 'next/link';

const HomeNav = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <nav className=" px-7 fixed top-0 z-50 w-full border-b-2 border-black-200 bg-black-100 py-7">
          <section className="flex-between items-center ">
            <div className="flex flex-row items-center gap-2">
              <MobileSideBar />
              <Link
                href="/"
                className="text-gradient_purple-blue font-lexend font-semibold text-[25px] tracking-[2px]"
              >
                Circuit
              </Link>
            </div>

            <div className="flex justify-end max-xs:w-[130px] text-white items-center">
              <ConnectButton chainStatus="none" />
              {/* <Button className="bg-grey-200 font-Azeret max-xs:text-[13px]">
              Connect Wallet
            </Button> */}
            </div>
          </section>
        </nav>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default HomeNav;
