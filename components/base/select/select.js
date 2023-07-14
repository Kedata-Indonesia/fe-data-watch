import clsx from 'clsx';
import ReactSelect, {
  SelectOption,
  StylesConfig,
  GroupBase,
  SelectComponents,
  MenuPlacement,
} from 'react-select';
import ValueContainer from './ValueContrainer';
import Option from './Option';
import MultiValue from './MultiValue';
import { Control as HookControl, useController } from 'react-hook-form';
// import Skeleton from 'common/components/base/Skeleton';
import React, { useEffect, useMemo, useState, RefObject } from 'react';
import { ErrorMessages } from '../error-messages';
import uniqueId from '@/utils/unique-id';

/**
 * @typedef SelectOption
 * @property {any} value
 * @property {string} label
 * @property {string} [helper]
 */

/**
 * @typedef SelectProps
 * @property {SelectOption[]} [options]
 * @property {string} [className]
 * @property {boolean} [searchable]
 * @property {JSX.Element} [icon]
 * Icon pada bagian root / input mirip seperti icon pada TextField
 * @property {JSX.Element} [optionIcon]
 * Icon untuk setiap item option
 * @property {object} [styles]
 * @property {(payload: SelectOption) => void} [onChange]
 * @property {boolean} [disabled]
 * @property {boolean} [fullWidth]
 * @property {string} [label]
 * @property {boolean} [multi]
 * @property {string} [placeholder]
 * @property {SelectOption} [defaultValue]
 * @property {HookControl} [control]
 * @property {object} [rules]
 * @property {boolean} [loading]
 * @property {number} [maxMenuHeight]
 * @property {string} [name]
 * @property {string} [fieldName]
 * @property {string} [clearable]
 * @property {boolean} [uniqueValue]
 * @property {boolean} [closeMenuOnSelect]
 * @property {boolean} [hideSelectedOptions]
 * @property {HTMLElement} [menuPortal]
 * @property {RefObject<HTMLElement>} [elementScroll] Close `Select` every time `elementScroll` element is scrolling
 * @property {boolean | (e: Event) => boolean} [closeMenuOnScroll]
 * @property {boolean | undefined} [open]
 * @property {MenuPlacement} [menuPlacement]
 */

/**
 * @description
 * Sometimes options doesn't has unique value. This function to set value as `uniqueId()` and root value in `_value`. Set value as `uniqueId()` because we need show unique value and color on list Options
 */
const uniqueIdMap = options =>
  options.map(item => {
    const children = item.options?.map(option => {
      return {
        ...option,
        value: uniqueId(),
        _value: option.value,
      };
    });

    const result = {
      ...item,
      value: uniqueId(),
      _value: item.value,
    };

    if (children) result.options = children;

    return result;
  });

/**
 * @param {SelectProps} props
 */
const Select = ({
  options: optionsProp = [],
  className = '',
  searchable = false,
  icon = null,
  optionIcon = null,
  styles = {},
  onChange = () => {},
  disabled = false,
  fullWidth = false,
  label = '',
  multi = false,
  multiMaxValue = null,
  placeholder = '',
  defaultValue = null,
  control = null,
  name = '',
  fieldName = null,
  rules = {},
  loading = false,
  maxMenuHeight = undefined,
  clearable = true,
  formatOptionLabel = null,
  uniqueValue = true,
  hideSelectedOptions = false,
  menuPortal = null,
  closeMenuOnScroll: closeMenuOnScrollProps,
  open,
  menuPlacement = 'auto',
  elementScroll,
  closeMenuOnSelect = !multi,
}) => {
  const BindValueContiner = ValueContainer.bind({ icon, disabled });

  const { field, fieldState, formState } = useController({
    control,
    name,
    rules,
  });
  const BindOption = Option.bind({ optionIcon });
  const [options, setOptions] = useState(() => {
    if (uniqueValue) return optionsProp;

    return uniqueIdMap(optionsProp);
  });

  /**
   * @type {StylesConfig<any, boolean, GroupBase<any>>}
   */
  const selectStyles = {
    indicatorSeparator: () => null,
    control: base => ({
      ...base,
      minHeight: '2.625rem',
    }),
    multiValue: base => ({
      ...base,
      margin: '3px',
    }),
    menuPortal: base => ({ ...base, zIndex: 100 }),
    ...styles,
  };

  const valueContainer = {
    ValueContainer: BindValueContiner,
  };

  /**
   * @type {Partial<SelectComponents<any, boolean, GroupBase<any>>>}
   */
  const components = {
    Option: BindOption,
    MultiValue,
    ...(!multi && valueContainer),
  };

  const value = useMemo(() => {
    if (!field.value) return null;

    if (multi)
      return field.value.map(value => {
        const option = options.find(option => option.value === value);
        return option;
      });

    return options.find(item => item.value === field.value);
  }, [field.value, multi, options]);

  const reactSelectProps = {
    isMulti: multi,
    placeholder: placeholder ? placeholder : 'Select...',
    className: clsx('react-select', fullWidth ? 'w-full' : 'w-inherit'),
    defaultValue,
    isSearchable: searchable,
    isDisabled: disabled,
    styles: selectStyles,
    components,
    onChange,
    options: optionsProp,
    maxMenuHeight,
    formatOptionLabel,
    hideSelectedOptions,
    ...(!defaultValue && value !== undefined ? { value } : {}),
  };

  useEffect(() => {
    setOptions(uniqueValue ? optionsProp : uniqueIdMap(optionsProp));
  }, [optionsProp, uniqueValue]);

  /**
   * @param {Event} e
   */
  const closeMenuOnScroll = e => {
    return e.target === elementScroll;
  };

  return (
    <div className={clsx('mb-4', fullWidth ? 'w-full' : 'w-44', className)}>
      {label ? <span className="mb-2 block font-bold uppercase">{label}</span> : null}
      {loading ? <div className="h-2.5 w-[120px] animate-pulse"></div> : null}
      {!loading ? (
        <>
          <ReactSelect
            {...reactSelectProps}
            ref={field.ref}
            isClearable={clearable}
            menuPlacement={menuPlacement}
            menuPortalTarget={menuPortal}
            closeMenuOnSelect={closeMenuOnSelect}
            classNamePrefix="react-select"
            closeMenuOnScroll={closeMenuOnScrollProps ? closeMenuOnScrollProps : closeMenuOnScroll}
            menuIsOpen={open}
            className={clsx(reactSelectProps.className, fieldState.error ? 'error' : null)}
            onChange={e => {
              if (multi && multiMaxValue && e.length > multiMaxValue) {
                onChange(e);
                return;
              } else if (multi) {
                const values = e.map(item => item.value);
                field.onChange(values);
                onChange(e);
                return;
              }

              let resultValue = undefined;

              if (!uniqueValue) {
                options.find(item => {
                  const selectedOption = item.options?.find(option => {
                    return option.value === e?.value;
                  });

                  if (selectedOption) {
                    resultValue = selectedOption?._value;
                  }

                  return !!selectedOption;
                });
              }

              field.onChange(resultValue ?? e?.value ?? null);
              onChange(e);
            }}
            onBlur={field.onBlur}
            value={value}
            options={options}
          />
          <ErrorMessages errors={formState.errors} name={name} />
        </>
      ) : null}
      {/* The purpose of this tag is show prop name */}
      {name && <span name={name} className="hidden" />}
    </div>
  );
};

Select.Memo = React.memo(Select);

export default Select;
