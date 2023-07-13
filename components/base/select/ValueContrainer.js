import { components, SelectOption, GroupBase, ValueContainerProps } from 'react-select';
import { ComponentType, useMemo } from 'react';
import clsx from 'clsx';

/**
 * @type {ComponentType<ValueContainerProps<SelectOption, boolean, GroupBase<SelectOption>>>}
 */
function ValueContainer({ children, ...props }) {
  const icon = this.icon;
  const Icon = useMemo(() => {
    if (props.selectProps.isMulti) {
      return icon;
    }
    if (props.hasValue) {
      return props.getValue()[0].icon;
    }
    return icon;
  }, [icon, props]);

  return (
    <>
      {Icon ? (
        <Icon
          className={clsx(
            'w-6 h-6 absolute left-4',
            this.disabled ? 'text-c-gray-400' : '',
            props.getValue()[0]?.icon ? 'text-c-gray-600' : 'text-c-red-500'
          )}
        />
      ) : null}
      <components.ValueContainer {...props} className={clsx(Icon ? '!pl-11' : '!pl-[14px]')}>
        {children}
      </components.ValueContainer>
    </>
  );
}

export default ValueContainer;
