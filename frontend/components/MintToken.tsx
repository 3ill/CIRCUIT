import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';

const MintToken = () => {
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');

  const isButtonDisabled = !amount || !quantity;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(amount);
    console.log(quantity);
  };

  return (
    <form className="flex flex-col">
      <label className='className="flex flex-col gap-y-2 bg-black-300 w-[450px] h-[550px] max-xs:w-[350px] rounded-[12px] px-5 "'>
        <div className="flex-between flex-row ">
          <div className="flex flex-col py-2 items-center">
            <p className="font-Azeret text-white-800 font-regular text-[13px]">
              Token Price
            </p>
            <div className="flex flex-col mt-2 items-center py-2 bg-black-400 rounded-[12px]">
              <div className="flex flex-row gap-1">
                {/* <div className="rounded-full h-[15px] w-[15px] bg-[#C3D748]" /> */}
                <p className="font-Azeret text-[#C3D748] font-semibold text-[11px]">
                  Gold Tier: 100 SURGE (2 ETH)
                </p>
              </div>
              <div className="flex flex-row gap-1 py-2">
                {/* <div className="rounded-full h-[15px] w-[15px] bg-[#D9D9D9]" /> */}
                <p className="font-Azeret text-[#D9D9D9] font-semibold text-[11px]">
                  Silver Tier: 50 SURGE (1 ETH)
                </p>
              </div>
              <div className="flex flex-row gap-1 items-center py-2">
                {/* <div className="rounded-full h-[15px] w-[15px] bg-[#998C4A]" /> */}
                <p className="font-Azeret text-[#998C4A] font-semibold ml-2 text-[11px]">
                  Bronze Tier: 25 SURGE (0.5 ETH)
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center py-2">
            <p className="font-Azeret text-white-800 font-medium text-[11px]">
              Mint Fee
            </p>
            <div className="flex flex-row items-center gap-2 p-2 bg-black-400 rounded-[12px] h-fit">
              <Image src="/Wallet.png" alt="wallet" width={30} height={30} />
              <p className="font-lexend font-semibold text-white-800 text-[13px]">
                0.02 ETH
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 items-center">
          <div>
            <p className="font-Azeret text-[11px] text-grey-100 px-7">
              Quantity
            </p>
            <Input
              className=" h-fit border-0 bg-white-500 w-[250px] max-xs:w-[250px] px-5 self-center py-6 pl-20 pr-8 text-black-400 !ring-0 !ring-offset-0 placeholder:text-black-300  font-lexend"
              type="text"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <p className="font-Azeret text-[11px] text-grey-100 px-7">Amount</p>
            <Input
              className=" h-fit border-0 bg-white-500 w-[250px] max-xs:w-[250px] px-5 self-center py-6 pl-20 pr-8 text-black-400 !ring-0 !ring-offset-0 placeholder:text-black-300  font-lexend"
              type="text"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <Button
            className={cn(
              ' bg-black-400 h-fit rounded-[15px]  self-center flex-center py-[80px] text-[20px]  font-lexend font-extrabold text-gradient_blue-purple shadow-lg w-[150px]'
            )}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Mint Now
          </Button>
        </div>
      </label>
    </form>
  );
};

export default MintToken;
