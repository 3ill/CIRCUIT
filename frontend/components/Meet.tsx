import Image from 'next/image';

const Meet = () => {
  return (
    <section className="paddings mx-auto w-full flex-col max-w-screen-2xl">
      <div className="flex-between max-xs:flex-col">
        <div>
          <Image src="/3illBaby.png" alt="profile" width={400} height={400} />
        </div>
        <div className="flex flex-col max-xs:mt-3">
          <h1 className="text-gradient_blue-purple font-lexend lg:text-[65px] md:text-[40px] max-xs:text[40px] font-bold tracking-[2px] w-full ">
            The Team
          </h1>
          <p className="text-grey-100 max-w-[673px] font-Azeret font-normal tracking-[2px] leading-[25px] max-xs:text-[15px] lg:text-[19px]">
            Chikezie is a highly skilled full-stack and blockchain developer,
            who also serves as the visionary driving force behind Circuit.{' '}
            <br />
            <br />
            Despite being relatively new to the blockchain industry, Chikezie
            has swiftly established himself as a formidable presence, with his
            exceptional creativity and unwavering work ethic forming the bedrock
            upon which Circuit was meticulously crafted
          </p>
        </div>
      </div>
    </section>
  );
};

export default Meet;
