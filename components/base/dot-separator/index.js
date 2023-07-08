import clsx from 'clsx';

const DotSeparator = ({ className }) => (
  <div className={clsx('inline-block h-[4px] w-[4px] rounded-full bg-gray-400', className)} />
);

export default DotSeparator;