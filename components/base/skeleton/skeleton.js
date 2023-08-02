/* eslint-disable react/display-name */
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

export default Skeleton;
