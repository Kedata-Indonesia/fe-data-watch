import clsx from 'clsx';

const badgeStyle = {
  danger: 'bg-c-red-50 text-c-red-600',
};

/**
 * @param {BadgeProps} props
 */
const Badge = ({ variant, text = null, children }) => {
  return (
    <div className={clsx('inline-block px-1.5 py-0.5 rounded-[4px]', badgeStyle[variant])}>
      {text ?? children}
    </div>
  );
};

export default Badge;

/**
 * @typedef BadgeProps
 * @property {keyof badgeStyle} variant
 * @property {string | null} text
 * @property {import('react').ReactNode} children
 */
