import Image from 'next/image';

const AuthLayout = ({ children = null }) => {
  return (
    <div className="flex">
      <div className="flex w-6/12 flex-col bg-[#FFF5F7] p-14">
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
      <div className="w-6/12 p-14 flex flex-col bg-white">{children}</div>
    </div>
  );
};

export default AuthLayout;
