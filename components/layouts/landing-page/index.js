import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BurgerMenuIcon, CloseIcon } from '@/components/icons';
import clsx from 'clsx';

const linkItems = [
  { title: 'Benefits', href: '/#benefits' },
  { title: 'Feature', href: '/#features' },
  { title: 'Check Queue', href: '/check-queue' },
];

const LandingPageLayout = ({ children = '', footerFixed = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickHandleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className={clsx('bg-white', footerFixed && 'flex h-screen flex-col justify-between')}>
      {/* Header */}
      <header className="sticky left-0 top-0 z-30 bg-white px-5 md:px-0">
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 py-4 lg:py-6">
          <Link href="/" passHref>
            <Image
              src="/logo.svg"
              width={160}
              height={36}
              alt="logo kalkula"
              className="hidden lg:block"
            />
            <Image
              src="/logo.svg"
              width={100}
              height={26}
              alt="logo kalkula"
              className="lg:hidden"
            />
          </Link>
          <ul className="hidden w-full justify-end gap-4 md:flex">
            {linkItems.map(item => (
              <li key={item.title} className="cursor-pointer hover:text-c-red-600">
                <Link href={item.href} scroll={false}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden w-[1px] self-stretch bg-c-gray-300 md:block" />
          <Link href="/#join" scroll={false} passHref className="hidden md:flex">
            <button
              type="button"
              className="w-40 rounded border border-c-red-600 bg-white py-[10px] text-c-red-600 hover:bg-c-gray-100"
            >
              Join Waitlist
            </button>
          </Link>

          {/* Mobile */}
          {isOpen ? (
            <CloseIcon
              className="h-5 w-5 text-c-neutral-900 md:hidden"
              onClick={onClickHandleMenu}
            />
          ) : (
            <BurgerMenuIcon
              className="h-5 w-5 text-c-neutral-900 md:hidden"
              onClick={onClickHandleMenu}
            />
          )}
        </nav>

        {/* Mobile */}
        <div
          className={clsx(
            'absolute left-0 h-[90vh] w-full flex-col justify-between bg-white transition-all duration-200 md:hidden',
            isOpen ? 'flex scale-100 ' : 'scale-0'
          )}
        >
          <ul className="flex w-full flex-col md:hidden [&>li:first-child]:border-t [&>li:first-child]:border-c-neutral-40">
            {linkItems.map(item => (
              <li
                key={item.title}
                className="cursor-pointer border-b border-b-c-neutral-40 px-6 py-4 hover:text-c-red-600"
              >
                <Link href={item.href} scroll={false}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="items-center border-t p-[20px] shadow-[0_0_30px_10px_rgba(9,30,66,0.08)]">
            <Link href="/#join" scroll={false} passHref>
              <button
                type="button"
                className="w-full rounded border border-c-red-600 bg-white py-[10px] text-c-red-600 hover:bg-c-gray-100"
              >
                Join Our Waitlist
              </button>
            </Link>
          </div>
        </div>
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
