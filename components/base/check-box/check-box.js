import { useController } from 'react-hook-form';
import clsx from 'clsx';

const CheckBox = ({ className = '', name = '', label = '', control = null, rules = {} }) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className="flex items-center">
      <input
        {...field}
        id={name}
        type="checkbox"
        className={clsx(
          'h-4 w-4 rounded-sm border-c-gray-300 text-c-red-600 focus:ring-2 focus:ring-white',
          className
        )}
      />
      <label htmlFor="is_entry_public" className="ml-2 text-sm text-c-gray-600">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
