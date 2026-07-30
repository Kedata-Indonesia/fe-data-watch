import clsx from 'clsx';

/**
 * @param {GroupSectionProps} props
 * @returns
 */
const GroupSection = ({ id, title, className, rootClassName, children }) => {
  return (
    <div id={id} className={clsx('mt-5', rootClassName)}>
      <h6 className="text-heading-6 font-bold">{title}</h6>
      <div className={clsx('mt-5', className)}>{children}</div>
    </div>
  );
};

export default GroupSection;

/**
 * @typedef GroupSectionProps
 * @property {string} id
 * @property {string} title
 * @property {string} className
 * @property {string} rootClassName
 * @property {React.ReactNode} children
 */
