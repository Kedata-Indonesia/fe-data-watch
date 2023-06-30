import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LandingPageLayout = ({ children = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="sticky left-0 top-0 z-30 bg-white">
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 py-6">
          <Image src="/logo.svg" width={136} height={36} alt="logo kalkula" />
          <ul className="flex w-full justify-end gap-4">
            <Link href="#benefits" scroll={false} passHref>
              <li className="cursor-pointer hover:text-c-red-600">Benefits</li>
            </Link>
            <Link href="#features" scroll={false} passHref>
              <li className="cursor-pointer hover:text-c-red-600">Feature</li>
            </Link>
          </ul>
          <div className="w-[1px] self-stretch bg-c-gray-300" />
          <Link href="#join" scroll={false} passHref>
            <button
              type="button"
              className="w-40 rounded border border-c-red-600 bg-white py-[10px] text-c-red-600 hover:bg-c-gray-100"
            >
              Join Waitlist
            </button>
          </Link>
        </nav>
      </header>

      {children}

      {/* Footer */}
      <footer>
        <div className="mx-auto p-[40px] text-center text-[10px] text-c-gray-600 md:text-[16px] lg:max-w-[1280px]">
          <div className="flex flex-col justify-between gap-y-[10px] md:flex-row">
            <span>
              © {new Date().getFullYear()} Kalkula by{' '}
              <a
                href="https://kedata.online/"
                className="text-c-red-600"
                target="_blank"
                rel="noreferrer"
              >
                Kedata
              </a>
              , All right reserved.
            </span>
            <div className="flex justify-center gap-[10px]">
              <Link href="/policy?tab=term-of-service" passHref>
                <span className="hover:cursor-pointer hover:underline">Term of Service</span>
              </Link>
              <div className="w-[1px] self-stretch bg-c-gray-300" />
              <Link href="/policy?tab=privacy-policy" passHref>
                <span className="hover:cursor-pointer hover:underline">Privacy Policy</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageLayout;
