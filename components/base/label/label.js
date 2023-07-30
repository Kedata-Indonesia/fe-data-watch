import clsx from 'clsx';

const labelStyle = {
  gray: 'bg-gray-200 text-gray-600',
  darkGray: 'bg-gray-600 text-white',
  blue: 'bg-blue-600 text-white',
  red: 'bg-red-50 text-red-600',
};

/**
 * @param {LabelProps} props
 */
const Label = ({ variant, text, children }) => {
  return (
    <div
      className={clsx(
        'py-2 px-4 rounded-[4px] text-[10px] font-bold uppercase',
        labelStyle[variant]
      )}
    >
      {text ?? children}
    </div>
  );
};

export default Label;

/**
 * @typedef LabelProps
 * @property {keyof labelStyle} variant
 * @property {string} text
 * @property {import('react').ReactNode} children
 */
