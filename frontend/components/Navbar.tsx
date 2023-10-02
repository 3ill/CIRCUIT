import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="flex-center fixed top-0 z-50 w-full border-b-2 border-black-200 bg-black-100 py-7">
      <section className="flex-between mx-auto w-full max-w-screen-2xl px-6 xs:px-8 sm:px-16">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
        </Link>
        <Link href="/member" className="text-white">
          <Button className="bg-grey-200">Get Started</Button>
        </Link>
      </section>
    </nav>
  );
};

export default Navbar;
