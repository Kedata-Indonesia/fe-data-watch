import Image from "next/image";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-5 py-4 bg-[#27272A]">
        <Image
          src="/logo-bw.svg"
          width={110}
          height={30}
          alt="logo kalkula"
          className="hidden lg:block"
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
