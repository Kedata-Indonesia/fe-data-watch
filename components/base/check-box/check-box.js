import { useController } from 'react-hook-form';
import clsx from 'clsx';
import { useMemo } from 'react';

const CheckBox = ({
  id = '',
  className = '',
  name = '',
  label = '',
  control = null,
  rules = {},
  dataType = 'string',
  value,
  onChange = () => {},
}) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  const checked = useMemo(() => {
    if (dataType === 'boolean') return field.value;

    return !!field.value;
  }, [dataType, field.value]);

  return (
    <div className="flex items-center">
      <input
        {...field}
        id={id}
        name={name}
        value={field.value ?? ''}
        checked={checked}
        type="checkbox"
        className={clsx(
          'h-4 w-4 rounded-sm border-c-gray-300 text-c-red-600 focus:ring-2 focus:ring-white',
          className
        )}
        onChange={e => {
          onChange(e);
          if (dataType === 'boolean') {
            field.onChange(e.target.checked);
            return;
          }

          field.onChange(e.currentTarget.checked ? value : '');
        }}
      />
      <label htmlFor={id} className="ml-2 select-none text-sm text-c-gray-600">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
