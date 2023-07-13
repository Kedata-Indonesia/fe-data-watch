import { components, OptionProps, SelectOption, GroupBase } from 'react-select';
import { ComponentType } from 'react';
import clsx from 'clsx';

/**
 * @type {ComponentType<OptionProps<SelectOption, boolean, GroupBase<SelectOption>>>}
 */
function Option({ children, ...props }) {
  const Icon = props.data.icon ? props.data.icon : this.optionIcon;
  const helper = props.data.helper ?? '';

  return (
    <components.Option
      {...props}
      className={clsx(
        '!cursor-pointer',
        Icon || helper ? '!flex items-start' : '',
        props.isFocused || props.isSelected
          ? '!bg-c-red-100/25 !text-c-red-600 !fill-c-red-600'
          : '!bg-white'
      )}
    >
      {Icon ? (
        <Icon
          className={clsx(
            `w-[22px] h-[22px] py-[2px] mr-3 ml-1 shrink-0 box-content`,
            props.data.iconFilled && 'fill-inherit'
          )}
        />
      ) : null}
      <div className={clsx('break-words overflow-auto', !!helper ? 'mr-4' : '')}>{children}</div>
      {!!helper && (
        <i
          className={clsx(
            'ml-auto flex-shrink-0',
            props.isFocused || props.isSelected ? 'text-c-red-600' : 'text-c-gray-400'
          )}
        >
          {helper}
        </i>
      )}
    </components.Option>
  );
}

export default Option;
