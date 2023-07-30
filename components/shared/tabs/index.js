import clsx from 'clsx';

/**
 * @param {TabsProps} props
 */
const Tabs = ({ activeItem, items, className, itemClassName, onChange }) => {
  return (
    <div
      className={clsx(
        'rounded-[4px] border border-gray-300',
        '[&_button:not(:last-child)]:border-r [&_button:not(:last-child)]:border-r-gray-300',
        className
      )}
    >
      {items.map(item => (
        <button
          key={item.key}
          className={clsx(
            'w-[139px] p-2.5 text-gray-400',
            activeItem === item.key && 'text-red-600',
            itemClassName
          )}
          onClick={() => onChange(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

/**
 * @typedef {Object} TabsProps
 * @property {string} activeItem
 * @property {Item[]} items
 * @property {string} className
 * @property {string} itemClassName
 * @property {(item: Item) => void} onChange
 */

/**
 * @typedef {Object} Item
 * @property {string} key
 * @property {string} label
 */
