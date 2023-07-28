import clsx from 'clsx';

/**
 * @param {TabsProps} props
 */
const Tabs = ({ activeItem, items, onChange }) => {
  return (
    <div
      className={clsx(
        'rounded-[4px] border border-gray-300',
        '[&_button:not(:last-child)]:border-r [&_button:not(:last-child)]:border-r-gray-300'
      )}
    >
      {items.map(item => (
        <button
          key={item.key}
          className={clsx(
            'w-[139px] p-2.5 text-gray-400',
            activeItem === item.key && 'text-red-600'
          )}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

/**
 * @typedef TabsProps
 * @property {string} activeItem
 * @property {Array<{key: string, label: string}>} items
 * @property {(key: string) => void} onChange
 */
