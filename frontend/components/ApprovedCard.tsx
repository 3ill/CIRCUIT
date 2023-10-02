import { cn } from '@/lib/utils';

interface Props {
  id: number;
  title: string;
  proposer: string;
  description: string;
  userTier: string;
  amount: number;
  voteCount: number;
  time: string;
}

const ApprovedCard = ({
  id,
  title,
  proposer,
  description,
  userTier,
  amount,
  voteCount,
  time,
}: Props) => {
  return (
    <section className="flex flex-col bg-black-400 lg:w-[800px] md:w-[450px] lg:h-[400px] md:h-[260px] max-xs:w-[350px]  rounded-[9px] mt-7 lg:mt-9 shadow-md">
      <section className="mt-5 flex flex-row justify-between px-2">
        <div>
          <h1 className="text-gradient_purple-blue font-lexend font-extrabold lg:text-[30px] md:text-[15px] max-xs:text-[13px]">
            {title}
          </h1>
        </div>

        <div className="flex-center flex-col">
          <p className="font-Azeret text-grey-100 md:text-[11px] max-xs:text-[9px]">
            Timestamp
          </p>
          <h3 className="font-Azeret font-bold text-red-700 lg:text-[30px] md:text-[15px] max-xs:text-[13px]">
            {time}
          </h3>
        </div>
      </section>

      <section className="flex flex-col mt-[10px] px-2">
        <p className="font-Azeret text-grey-100 md:text-[11px] max-xs:text-[9px]">
          Proposer
        </p>
        <h1 className="font-lexend font-extrabold lg:text-[30px] md:text-[15px] max-xs:text-[13px] mt-1 text-gradient_purple-blue">
          {proposer}
        </h1>
      </section>

      <section className="flex flex-col mt-[10px] px-2">
        <p className="font-Azeret text-grey-100 md:text-[11px] max-xs:text-[9px]">
          Description
        </p>
        <h1 className="font-Azeret text-white  lg:text-[15px] md:text-[13px] max-xs:text-[13px] text-left md:max-w-[315px] max-xs:w-[315px] lg:w-[515px]  mt-1">
          {description}
        </h1>
      </section>

      <section className="bg-black-300 mt-[55px] lg:mt-[150px] rounded-br-[9px] rounded-bl-[9px] px-2 py-2 md:py-3 shadow-md items-center">
        <div className="flex justify-between">
          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-1">
              <p className="font-Azeret text-[12px] text-grey-200">Tier: </p>
              <p
                className={cn(
                  userTier == 'gold'
                    ? 'text-[#998C4A]'
                    : userTier == 'silver'
                    ? 'text-[#D1E8E2]'
                    : 'text-[#664616]',
                  'font-lexend text-[12px] font-semibold capitalize  '
                )}
              >
                {userTier}
              </p>
            </div>

            <div className="flex flex-row gap-1">
              <p className="font-Azeret text-[12px] text-grey-200 ">Amount: </p>
              <p
                className={cn(
                  userTier == 'gold'
                    ? 'text-[#998C4A]'
                    : userTier == 'silver'
                    ? 'text-[#D1E8E2]'
                    : 'text-[#664616]',
                  'font-lexend text-[12px] font-semibold capitalize'
                )}
              >
                {voteCount}
              </p>
            </div>

            <div className="flex flex-row gap-1">
              <p className="font-Azeret text-[12px] text-grey-200 ">Vote: </p>
              <p
                className={cn(
                  userTier == 'gold'
                    ? 'text-[#998C4A]'
                    : userTier == 'silver'
                    ? 'text-[#D1E8E2]'
                    : 'text-[#664616]',
                  'font-lexend text-[12px] font-semibold capitalize'
                )}
              >
                {amount}
              </p>
            </div>
          </div>

          <button className="flex flex-row gap-1 items-center">
            <div>
              <p className="font-lexend text-[12px] font-semibold capitalize text-green-400">
                APPROVED
              </p>
            </div>
          </button>
        </div>
      </section>
    </section>
  );
};

export default ApprovedCard;
