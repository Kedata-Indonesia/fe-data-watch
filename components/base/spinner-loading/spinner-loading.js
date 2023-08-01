import Image from 'next/image';

const SpinnerLoading = () => {
  return (
    <div className="animate-spin-reverse w-[180px] h-[180px]">
      <Image src="/loading.png" width={180} height={180} alt="Spinner" priority={true} />
    </div>
  );
};

export default SpinnerLoading;
