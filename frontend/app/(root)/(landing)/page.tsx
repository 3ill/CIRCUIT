import Image from 'next/image';
import About from '@/components/About';
import Meet from '@/components/Meet';
import { technologies } from '../../../constants';

const page = () => {
  return (
    <main className="flex-center paddings mx-auto w-full flex-col max-w-screen-2xl">
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-grey-200/5 bg-center text-center frame">
          <h1 className=" font-lexend text-[80px] max-xs:text-[35px] tracking-[34.2px] max-sm:tracking-[15px] mb-6 text-center text-white">
            CIRCUIT
          </h1>
          <div>
            <h3 className="text-gradient_purple-blue font-Azeret text-[20px] max-xs:text-[15px]">
              Control, Govern, Distribute
            </h3>
          </div>
        </div>
        <About />
        <Meet />
        <section className="flex flex-col mt-7">
          <h1 className="font-lexend lg:text-[65px] md:text-[40px] max-xs:text[40px] font-bold tracking-[2px] text-gradient_blue-purple self-center  ">
            Powered By
          </h1>
          <div className="flex flex-row gap-3 items-center justify-center mt-3">
            {technologies.map((technology: any) => (
              <div key={technology.name}>
                <Image
                  src={technology.icon}
                  alt="tech"
                  width={212}
                  height={212}
                />
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default page;
