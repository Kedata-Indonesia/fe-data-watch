import clsx from 'clsx';

const Section = ({ children = '', className = 'bg-white', id = '' }) => {
  return (
    <section id={id} className={clsx('px-5 md:px-0', className)}>
      <div className="mx-auto w-full items-center lg:max-w-[1160px]">{children}</div>
    </section>
  );
};

export default Section;
