import clsx from 'clsx';

const SwiperNavigation = ({ className = '', children = null }) => (
  <div
    className={clsx(
      'absolute bottom-0 z-10 cursor-pointer rounded bg-c-red-600 px-3 py-2 text-white md:bottom-auto md:top-1/3',
      className
    )}
  >
    {children}
  </div>
);

export default SwiperNavigation;
