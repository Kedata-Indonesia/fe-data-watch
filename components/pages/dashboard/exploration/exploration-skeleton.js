import { Skeleton } from '@/components/base/skeleton';
import makeArray from '@/utils/make-array';

const ExplorationSkeleton = () => {
  return (
    <div className="w-full p-6">
      <Skeleton width={400} height={32} />
      <div className="my-2" />
      <Skeleton width={260} height={32} />
      <div className="my-5" />
      <div className="flex gap-4 items-start">
        <div className="grid grid-cols-2 w-[70%] gap-4">
          <Skeleton width="100%" height={100} />
          <Skeleton width="100%" height={100} />
          <Skeleton width="100%" height={100} />
          <Skeleton width="100%" height={100} />
          <Skeleton width="100%" height={100} />
          <Skeleton width="100%" height={100} />
        </div>
        <div className="grid w-[30%] gap-2">
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
        </div>
      </div>
      <div className="my-5" />
      <Skeleton width={260} height={32} />
      <div className="my-5" />
      <Skeleton width="40%" height={32} />
      <div className="my-3" />
      <Skeleton width="60%" height={32} />
      <div className="my-3" />
      <Skeleton width="50%" height={32} />
      <div className="my-3" />
      <Skeleton width="50%" height={32} />
      <div className="my-3" />
      <Skeleton width="20%" height={32} />
    </div>
  );
};

const ExplorationSidebarSkeleton = () => {
  return makeArray(5).map((_, index) => {
    return (
      <div key={index} className="mb-3 w-full h-8">
        <Skeleton width="100%" height="100%" />
      </div>
    );
  });
};

export { ExplorationSkeleton, ExplorationSidebarSkeleton };
