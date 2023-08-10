import clsx from 'clsx';
import dayjs from 'dayjs';
import ReactDatePicker from 'react-datepicker';
import { Control, useController, useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo } from 'react';
import { Button } from '../button';
import { Select } from '../select';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import { Skeleton } from '../skeleton';
import CalendarIcon from '@/components/icons/CalendarIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import { TextField } from '../text-field';

/**
 * @typedef DatePickerClassNames
 * @property {string} popper
 */

/**
 * @typedef DatePickerProps
 * @property {string} [className]
 * @property {DatePickerClassNames} [classNames]
 * @property {string} [placeholder]
 * @property {Date} [value]
 * @property {Date} [minDate]
 * @property {boolean} [disabled]
 * @property {string} [name]
 * @property {string} [fieldName]
 * @property {string} [label]
 * @property {Date} [endDate]
 * @property {Date} [startDate]
 * @property {boolean} [selectDate]
 * @property {Control} [control]
 * @property {(date: Date) => void} [onChange]
 * @property {Rules | RulesComposition[]} [rules]
 * @property {boolean} [loading]
 * @property {string} [format]
 * @property {string} [portalId]
 */

const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';

const getDateValue = (date, format = DEFAULT_DATE_FORMAT) => {
  if (!date) return '';

  return dayjs(date).format(format);
};

const monthOptions = [
  {
    label: 'January',
    value: 1,
  },
  {
    label: 'February',
    value: 2,
  },
  {
    label: 'March',
    value: 3,
  },
  {
    label: 'April',
    value: 4,
  },
  {
    label: 'May',
    value: 5,
  },
  {
    label: 'June',
    value: 6,
  },
  {
    label: 'July',
    value: 7,
  },
  {
    label: 'August',
    value: 8,
  },
  {
    label: 'September',
    value: 9,
  },
  {
    label: 'October',
    value: 10,
  },
  {
    label: 'November',
    value: 11,
  },
  {
    label: 'December',
    value: 12,
  },
];

const DatePickerHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      month: new Date(date).getMonth() + 1,
      years: new Date(date).getFullYear(),
    },
  });

  const yearsWatch = watch('years');

  useEffect(() => {
    const newDate = new Date(date);
    setValue('month', newDate.getMonth() + 1);
    setValue('years', newDate.getFullYear());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <div className="w-full flex items-center">
      <Button
        className="!mx-2 !p-3"
        IconStart={<ChevronLeftIcon />}
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled || yearsWatch <= 1}
      />
      <Select
        searchable
        control={control}
        name="month"
        options={monthOptions}
        maxMenuHeight="150px"
        placeholder="Month"
        clearable={false}
        className="!text-sm !w-[150px] !text-left !mb-0 mr-2"
        onChange={e => {
          if (!e) return;
          changeMonth(e.value - 1);
        }}
      />
      <TextField
        control={control}
        name="years"
        placeholder="Years"
        className="!mb-0"
        type="number"
        format="years"
        inputClassName="!text-sm !p-2 w-[75px]"
        onChange={e => {
          console.log(e.target.value);
          if (e.target.value) changeYear(e.target.value);
        }}
      />
      <Button
        className="!mx-2 !p-3"
        IconStart={<ChevronRightIcon />}
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled || yearsWatch >= 9999}
      />
    </div>
  );
};
/**
 * @param {DatePickerProps} props
 */
const DatePicker = ({
  className = '',
  placeholder = '',
  minDate = null,
  disabled = false,
  name = '',
  fieldName = '',
  control = null,
  onChange = () => {},
  rules = {},
  label = '',
  loading = false,
  selectEnd = false,
  startDate = null,
  endDate = null,
  format,
  portalId,
  classNames = {},
  withTimeInput = false,
}) => {
  format = format ? format : DEFAULT_DATE_FORMAT;

  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });

  const Label = useCallback(() => {
    if (!label) return null;

    return <div className="font-bold uppercase mb-2">{label}</div>;
  }, [label]);

  const timeInputProps = useMemo(() => {
    if (withTimeInput) {
      return {
        showTimeInput: true,
        timeFormat: 'HH:mm',
      };
    }
  }, [withTimeInput]);

  return (
    <div className={clsx('mb-4', className)}>
      <Label />
      {loading ? (
        <Skeleton.Input />
      ) : (
        <div className="relative cursor-pointer">
          <ReactDatePicker
            portalId={portalId}
            popperClassName={classNames.popper}
            wrapperClassName="w-full"
            className={clsx(
              'rounded-md border-gray-300 w-full placeholder:text-gray-300 !cursor-pointer',
              fieldState.error && !disabled ? 'error' : null,
              disabled ? 'bg-gray-200' : null
            )}
            onChange={e => {
              onChange(e);
              field.onChange(e);
            }}
            ref={ref => {
              field.ref({
                focus: ref?.setFocus,
              });
            }}
            onBlur={field.onBlur}
            selected={field.value}
            value={getDateValue(field.value, format)}
            minDate={minDate}
            selectsEnd={selectEnd}
            startDate={startDate}
            endDate={endDate}
            disabled={disabled}
            placeholderText={placeholder}
            popperPlacement="bottom-end"
            renderCustomHeader={props => <DatePickerHeader {...props} />}
            {...timeInputProps}
          />
          <CalendarIcon className="w-4 h-4 absolute right-3 top-[12px] text-gray-600" />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
