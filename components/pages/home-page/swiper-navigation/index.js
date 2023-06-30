import clsx from 'clsx';

const SwiperNavigation = ({ className = '', children = null }) => (
  <div
    className={clsx(
      'bg-c-red-600 text-white absolute rounded px-3 py-2 z-10 top-1/3 cursor-pointer',
      className
    )}
  >
    {children}
  </div>
);

export default SwiperNavigation;
