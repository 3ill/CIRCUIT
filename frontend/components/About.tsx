import Image from 'next/image';

const About = () => {
  return (
    <section className="paddings mx-auto w-full flex-col max-w-screen-2xl">
      <div className="flex-between max-xs:flex-col">
        <div className="flex flex-col">
          <h1 className="text-gradient_blue-purple font-lexend lg:text-[65px] md:text-[40px] max-xs:text[40px] font-bold tracking-[2px] ">
            What is Circuit ?
          </h1>
          <p className="text-grey-100 max-w-[673px] font-Azeret font-normal tracking-[2px] leading-[25px] max-xs:text-[15px] lg:text-[19px]">
            Circuit stands as a beacon of democratized governance, fostering
            inclusivity, transparency, and community-driven progression.
          </p>
          <p className="text-grey-100 max-w-[673px] font-Azeret font-normal tracking-[2px] leading-[25px] max-xs:text-[15px] lg:text-[19px] mt-5">
            It is a testament to the boundless potential that emerges when
            decentralization and innovation converge, offering a dynamic
            platform where ideas flourish, voices resonate, and collective
            decisions shape the course of the decentralized web
          </p>
        </div>
        <div>
          <Image src="/lock.png" alt="lock" width={502} height={447} />
        </div>
      </div>
    </section>
  );
};

export default About;
