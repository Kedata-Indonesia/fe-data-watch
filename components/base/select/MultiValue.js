import { components, MultiValueProps, SelectOption, GroupBase } from 'react-select';
import { ComponentType } from 'react';
import clsx from 'clsx';

/**
 * @type {ComponentType<MultiValueProps<SelectOption, boolean, GroupBase<SelectOption>>>}
 */
const MultiValue = ({ children, ...props }) => {
  const Icon = props.data.icon ?? null;
  const disabled = props.isDisabled;

  return (
    <components.MultiValue
      {...props}
      className={clsx(
        '!rounded flex',
        disabled ? '!bg-c-gray-200 !text-c-gray-400 ' : '!bg-c-red-50 !text-c-red-600 '
      )}
    >
      {Icon ? <Icon className="flex-shrink-0 w-4 h-4 my-auto mr-[3px]" /> : null}
      {children}
    </components.MultiValue>
  );
};

export default MultiValue;
