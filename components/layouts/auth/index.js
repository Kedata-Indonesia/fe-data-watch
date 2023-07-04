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
        <section>asdasdasd</section>
      </div>
      <div className="w-6/12 p-14"></div>
    </div>
  );
};

export default AuthLayout;
