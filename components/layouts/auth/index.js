import Image from 'next/image';
import Link from 'next/link';
import { CloseIcon, BurgerMenuIcon } from '@/components/icons';
import { useState } from 'react';
import clsx from 'clsx';

const linkItems = [
  { title: 'Benefits', href: '/#benefits' },
  { title: 'Feature', href: '/#features' },
  { title: 'Blog', href: '/blog' },
  { title: 'Check Queue', href: '/check-queue' },
];

const AuthLayout = ({ children = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickHandleMenu = () => setIsOpen(prev => !prev);

  return (
    <>
      <header className="sticky left-0 top-0 z-30 bg-white px-5 md:px-0">
        <nav className="mx-auto lg:hidden flex max-w-[1280px] items-center justify-between gap-6 py-4 lg:py-6">
          <Link href="/" passHref>
            <Image
              src="/logo.svg"
              width={100}
              height={26}
              alt="logo kalkula"
              className="lg:hidden"
            />
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
      <div className="flex">
        <div className="hidden lg:flex w-6/12 flex-col bg-[#FFF5F7] p-14">
          <Image
            src="/logo.svg"
            width={160}
            height={36}
            alt="logo kalkula"
            className="hidden lg:block"
          />
          <section>
            <h1 className="mb-4 font-archivo text-2xl font-bold md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-10">
              <span className="text-c-red-600">Elevate Your Data Quality </span>
              <span>Assessment Experience!</span>
            </h1>
            <p className="mb-6 text-[10px] md:text-base">
              Streamline Your Data Analysis Process:
              <br />
              Upload | Explore | Set Rules | Enhance
            </p>
            <div className="relative h-[500px] w-full lg:h-[500px]">
              <Image
                alt="kalkula image"
                src="/images/home-img-1.png"
                style={{ objectFit: 'contain' }}
                fill
              />
            </div>
          </section>
        </div>
        <div className="w-full lg:w-6/12 p-5 lg:p-14 flex flex-col bg-white h-[90vh] justify-between">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
