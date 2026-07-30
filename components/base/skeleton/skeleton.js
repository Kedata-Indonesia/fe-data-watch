/* eslint-disable react/display-name */
import makeArray from '@/utils/make-array';
import clsx from 'clsx';
import ReactSkeleton from 'react-loading-skeleton';

const Skeleton = ({ className = '', count = 1, height = 16, width = '100%' }) => {
  return (
    <ReactSkeleton containerClassName={className} count={count} height={height} width={width} />
  );
};

Skeleton.Blog = ({ className = '' }) => {
  return (
    <div className={clsx('bg-white shadow', className)}>
      <div className="h-[160px] p-2">
        <ReactSkeleton height={160} circle={false} />
      </div>
      <p className="p-6">
        <ReactSkeleton count={2} />
      </p>
    </div>
  );
};

Skeleton.SourceTable = () => {
  return (
    <div className="h-full w-full overflow-auto">
      <div className="grid w-[70%] grid-cols-6 bg-white">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={`tbl-skl-${idx}`} className="border-b border-r border-gray-300 bg-gray-100 p-3">
            <div className="h-[20px] w-full animate-pulse rounded-sm bg-gray-300" />
          </div>
        ))}
      </div>
      <div className="grid w-[70%] grid-cols-6 bg-white">
        {Array.from({ length: 102 }).map((_, idx) => (
          <div key={`tbl-sklr-${idx}`} className="border-b border-r border-gray-300 p-3">
            <div className="h-[20px] w-full animate-pulse rounded-sm bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

Skeleton.ExplorationContent = () => {
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

Skeleton.ExplorationSidebar = () => {
  return makeArray(5).map((_, index) => {
    return (
      <div key={index} className="mb-3 w-full h-8">
        <Skeleton width="100%" height="100%" />
      </div>
    );
  });
};

export default Skeleton;
