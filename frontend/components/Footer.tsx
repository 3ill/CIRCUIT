import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-white-800 flex-between w-full gap-y-10 border-t border-black-400 bg-black-100 px-20 py-1 max-md:flex-col flex-col !font-Azeret mt-5 ">
      <p className="font-Azeret text-gray-300 text-[15px] max-xs:text-[12px] pt-5">
        Copyright © 2023 Circuit | All Rights Reserved
      </p>

      <div className="flex gap-x-9  text-gray-300 text-[15px] max-xs:text-[12px]  ">
        <Link href="/terms-of-use" className="font-Azeret">
          Terms & Conditions
        </Link>
        <Link href="/privacy-policy " className="font-Azeret">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
