import { default as clsx } from 'clsx';

const SectionBox = ({ id, title, className, children }) => {
  return (
    <div id={id} className="mt-5">
      <h6 className="font-bold">{title}</h6>
      <div className={clsx('mt-5', className)}>{children}</div>
    </div>
  );
};

export default SectionBox;
